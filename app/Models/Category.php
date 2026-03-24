<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Category extends Model
{
    use HasFactory;

    // Izinkan kolom ini diisi
    protected $fillable = ['name', 'slug', 'parent_id'];

    /**
     * Parent category (untuk subkategori)
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * Child categories (subkategori)
     */
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     * Relasi: Satu kategori punya banyak produk
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get all products including from child categories
     */
    public function allProducts(): HasMany
    {
        return $this->hasMany(Product::class)->orWhereIn('category_id', $this->children()->pluck('id'));
    }

    public function latestProduct()
    {
        return $this->hasOne(Product::class)->latestOfMany();
    }

    /**
     * Scope: Hanya parent categories (yang tidak punya parent)
     */
    public function scopeParents(Builder $query): Builder
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Scope: Hanya child categories (subkategori)
     */
    public function scopeChildren(Builder $query): Builder
    {
        return $query->whereNotNull('parent_id');
    }

    /**
     * Check if category is parent
     */
    public function isParent(): bool
    {
        return is_null($this->parent_id);
    }

    /**
     * Check if category is child (subkategori)
     */
    public function isChild(): bool
    {
        return !is_null($this->parent_id);
    }
}
