<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Enum\PaymentStatus;
use App\Services\OrderService;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        $order = $this->record;

        // Automatically trigger payment success email if admin marks payment as successful manually
        if ($order->payment_status === PaymentStatus::Success && !$order->payment_email_sent) {
            app(OrderService::class)->sendPaymentSuccessEmails($order);
        }
    }
}
