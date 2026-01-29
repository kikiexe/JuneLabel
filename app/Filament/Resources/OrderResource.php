<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Enum\OrderStatus;
use App\Enum\PaymentStatus;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = 'Shop';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Order Information')->schema([
                    Forms\Components\TextInput::make('order_id')
                        ->disabled()
                        ->label('Order ID'),
                    Forms\Components\TextInput::make('customer_name')
                        ->required()
                        ->label('Customer Name'),
                    Forms\Components\TextInput::make('email')
                        ->email()
                        ->label('Email Address'),
                    Forms\Components\TextInput::make('customer_phone')
                        ->tel()
                        ->label('Phone'),
                    Forms\Components\Textarea::make('shipping_address')
                        ->columnSpanFull()
                        ->label('Shipping Address'),
                    Forms\Components\Textarea::make('notes')
                        ->columnSpanFull()
                        ->label('Notes'),
                ])->columns(2),

                Forms\Components\Section::make('Status & Shipping')->schema([
                    Forms\Components\Select::make('payment_status')
                        ->options([
                            'pending' => 'Pending',
                            'success' => 'Success',
                            'failed' => 'Failed',
                            'expired' => 'Expired',
                        ])
                        ->required(),

                    Forms\Components\Select::make('order_status')
                        ->options([
                            'pending' => 'Pending',
                            'processing' => 'Processing',
                            'shipped' => 'Shipped',
                            'delivered' => 'Delivered',
                            'cancelled' => 'Cancelled',
                        ])
                        ->required()
                        ->live(),

                    Forms\Components\TextInput::make('tracking_number')
                        ->label('Tracking Number (Resi)')
                        ->visible(function (Forms\Get $get) {
                            $status = $get('order_status');
                            $value = $status instanceof \App\Enum\OrderStatus ? $status->value : $status;
                            return in_array($value, ['shipped', 'delivered', 'processing']);
                        }),

                    Forms\Components\Textarea::make('cancellation_reason')
                        ->label('Reason for Cancellation')
                        ->visible(function (Forms\Get $get) {
                            $status = $get('order_status');
                            $value = $status instanceof \App\Enum\OrderStatus ? $status->value : $status;
                            return $value === 'cancelled';
                        })
                        ->columnSpanFull(),
                ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_id')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('customer_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('gross_amount')
                    ->money('IDR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('payment_status')
                    ->badge()
                    ->color(fn($state): string => match ($state instanceof PaymentStatus ? $state->value : $state) {
                        'pending' => 'warning',
                        'success' => 'success',
                        'failed' => 'danger',
                        'expired' => 'gray',
                        default => 'primary',
                    }),
                Tables\Columns\TextColumn::make('order_status')
                    ->badge()
                    ->color(fn($state): string => match ($state instanceof OrderStatus ? $state->value : $state) {
                        'pending' => 'gray',
                        'processing' => 'info',
                        'shipped' => 'success',
                        'delivered' => 'success',
                        'cancelled' => 'danger',
                        default => 'primary',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
