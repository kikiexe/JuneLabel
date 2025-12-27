<?php

namespace App\Enum;

use Filament\Support\Contracts\HasLabel;
use Filament\Support\Contracts\HasColor;

enum OrderStatus: string implements HasLabel, HasColor
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Pending => 'Menunggu',
            self::Processing => 'Diproses',
            self::Shipped => 'Dikirim',
            self::Delivered => 'Selesai',
            self::Cancelled => 'Dibatalkan',
        };
    }

    public function getColor(): string | array | null
    {
        return match ($this) {
            self::Pending => 'gray',
            self::Processing => 'warning',
            self::Shipped => 'info',
            self::Delivered => 'success',
            self::Cancelled => 'danger',
        };
    }
    
    public function isCancellable(): bool
    {
        return in_array($this, [self::Pending, self::Processing]);
    }
    
    public function isFinal(): bool
    {
        return in_array($this, [self::Delivered, self::Cancelled]);
    }
    
    public function nextStatuses(): array
    {
        return match($this) {
            self::Pending => [self::Processing, self::Cancelled],
            self::Processing => [self::Shipped, self::Cancelled],
            self::Shipped => [self::Delivered],
            self::Delivered => [],
            self::Cancelled => [],
        };
    }
}