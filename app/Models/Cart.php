<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
    use HasFactory;

    // Izinkan Mass Assignment
    protected $fillable = [
        'identifier',
        'user_id',
        'product_id',
        'quantity',
    ];

    // Relasi ke User (Owner keranjang)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Product (Biar tau ini keranjang isinya apa)
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}