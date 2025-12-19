<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id', 'sku', 'name', 'slug', 'image', 
        'description', 'price', 'stock', 'weight', 'is_active'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
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