<?php

namespace App\Filament\Resources\ContactInquiryResource\Pages;

use App\Filament\Resources\ContactInquiryResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewContactInquiry extends ViewRecord
{
    protected static string $resource = ContactInquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    /**
     * Auto mark as read when viewed
     */
    public function mount(int | string $record): void
    {
        parent::mount($record);

        if ($this->record->status === 'new') {
            $this->record->update([
                'status' => 'read',
                'read_at' => now(),
            ]);
        }
    }
}
