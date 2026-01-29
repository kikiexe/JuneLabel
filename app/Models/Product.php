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
        'category_id',
        'sku',
        'name',
        'slug',
        'image',
        'gallery',
        'description',
        'price',
        'stock',
        'weight',
        'is_active',
        'is_best_seller'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'is_best_seller' => 'boolean',
        'gallery' => 'array',
    ];

    protected $appends = ['image_url'];

    /**
     * Otomatis convert semua gambar ke WebP saat upload
     * - Image utama: resize max 1000px, quality 75%
     * - Gallery: loop semua foto, convert ke WebP
     */
    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            $disk = Storage::disk('public');

            // Proses image utama
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

            // Proses gallery (loop banyak foto)
            if ($product->isDirty('gallery') && is_array($product->gallery)) {
                $newGallery = [];

                foreach ($product->gallery as $item) {
                    // Skip jika sudah .webp
                    if (str_ends_with($item, '.webp')) {
                        $newGallery[] = $item;
                        continue;
                    }

                    if ($disk->exists($item)) {
                        $newPath = preg_replace('/\.[^.]+$/', '.webp', $item);
                        $img = Image::read($disk->path($item));
                        $img->scaleDown(width: 1000);
                        $img->toWebp(quality: 75)->save($disk->path($newPath));
                        $newGallery[] = $newPath;
                        if ($item !== $newPath) $disk->delete($item);
                    } else {
                        $newGallery[] = $item;
                    }
                }
                $product->gallery = $newGallery;
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /** Generate URL lengkap untuk image */
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }
        return Storage::disk('public')->url($this->image);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /** Cegah hapus permanen jika produk pernah dipesan */
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
