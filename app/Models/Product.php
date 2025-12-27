<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id', 'sku', 'name', 'slug', 'image', 'gallery',
        'description', 'price', 'stock', 'weight', 'is_active'
    ];

    /**
     * LOGIKA OTOMATIS: Convert Image & Gallery ke WebP
     */
    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            $disk = Storage::disk('public');

            // --- BAGIAN 1: PROSES IMAGE UTAMA (Sama kayak tadi) ---
            if ($product->isDirty('image') && $product->image) {
                $originalPath = $product->image;
                if ($disk->exists($originalPath)) {
                    $newPath = preg_replace('/\.[^.]+$/', '.webp', $originalPath);
                    $image = Image::read($disk->path($originalPath));
                    $image->scaleDown(width: 1000); 
                    $image->toWebp(quality: 75)->save($disk->path($newPath));
                    $product->image = $newPath;
                    if ($originalPath !== $newPath) $disk->delete($originalPath);
                }
            }

            // --- BAGIAN 2: PROSES GALLERY (Looping banyak foto) ---
            if ($product->isDirty('gallery') && is_array($product->gallery)) {
                $newGallery = [];
                
                foreach ($product->gallery as $item) {
                    // Kalau item sudah .webp (file lama), biarkan
                    if (str_ends_with($item, '.webp')) {
                        $newGallery[] = $item;
                        continue;
                    }

                    if ($disk->exists($item)) {
                        $newPath = preg_replace('/\.[^.]+$/', '.webp', $item);
                        $img = Image::read($disk->path($item));
                        $img->scaleDown(width: 1000); // Resize
                        $img->toWebp(quality: 75)->save($disk->path($newPath));
                        
                        $newGallery[] = $newPath;
                        
                        // Hapus file asli
                        if ($item !== $newPath) $disk->delete($item);
                    } else {
                        $newGallery[] = $item; // Jaga-jaga kalau file ga ketemu
                    }
                }
                // Simpan array gallery yang sudah jadi WebP semua
                $product->gallery = $newGallery;
            }
        });
    }

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'gallery' => 'array',
    ];

    // Relationships
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // Security: Prevent force delete if has order history
    public function forceDelete()
    {
        if ($this->orderItems()->exists()) {
            throw new \LogicException(
                "Cannot permanently delete product ID {$this->id} ({$this->name}) - has order history",
                422
            );
        }
        
        return parent::forceDelete();
    }
}