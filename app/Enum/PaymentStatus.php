<?php

namespace App\Enum;

use Filament\Support\Contracts\HasLabel;
use Filament\Support\Contracts\HasColor;

enum PaymentStatus: string implements HasLabel, HasColor
{
    case Pending = 'pending';
    case Success = 'success';
    case Failed = 'failed';
    case Expired = 'expired';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Pending => 'Belum Bayar',
            self::Success => 'Lunas',
            self::Failed => 'Gagal',
            self::Expired => 'Kadaluarsa',
        };
    }

    public function getColor(): string | array | null
    {
        return match ($this) {
            self::Pending => 'gray',
            self::Success => 'success',
            self::Failed => 'danger',
            self::Expired => 'danger',
        };
    }
}   