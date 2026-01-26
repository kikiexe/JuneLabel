<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Shop';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Info Produk')->schema([
                    Forms\Components\Select::make('category_id')
                        ->relationship('category', 'name')
                        ->required()
                        ->label('Kategori Hijab'),

                    Forms\Components\TextInput::make('name')
                        ->required()
                        ->label('Nama Produk')
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn(Forms\Set $set, ?string $state) => $set('slug', Str::slug($state))),

                    Forms\Components\TextInput::make('sku')
                        ->label('SKU (Kode Barang)')
                        ->required()
                        ->unique(ignoreRecord: true),

                    Forms\Components\TextInput::make('slug')
                        ->disabled()
                        ->dehydrated()
                        ->required(),

                    Forms\Components\Textarea::make('description')
                        ->label('Deskripsi')
                        ->rows(3)
                        ->columnSpanFull(),

                    Forms\Components\Grid::make(3)->schema([
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('Rp')
                            ->label('Harga'),

                        Forms\Components\TextInput::make('weight')
                            ->label('Berat Produk (gram)')
                            ->required()
                            ->numeric()
                            ->default(200)
                            ->suffix('gram')
                            ->helperText('Digunakan untuk kalkulasi ongkir otomatis via RajaOngkir.'),

                        Forms\Components\TextInput::make('stock')
                            ->required()
                            ->numeric()
                            ->label('Stok')
                            ->default(0),
                    ]),

                    Forms\Components\Toggle::make('is_active')
                        ->label('Aktif')
                        ->default(true),

                    Forms\Components\Toggle::make('is_best_seller')
                        ->label('Best Seller')
                        ->default(false),
                ]),

                Forms\Components\Section::make('Gambar Produk')->schema([

                    Forms\Components\FileUpload::make('image')
                        ->label('Foto Utama (Thumbnail)')
                        ->directory('products')
                        ->image()
                        ->imageEditor()
                        ->required(),


                    Forms\Components\FileUpload::make('gallery')
                        ->label('Galeri Foto Lainnya (Pose Beda)')
                        ->directory('products')
                        ->image()
                        ->multiple()
                        ->reorderable()
                        ->panelLayout('grid')
                        ->columnSpanFull(),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('category.name')->label('Kategori'),
                Tables\Columns\TextColumn::make('price')->money('IDR'),
                Tables\Columns\TextColumn::make('weight')
                    ->label('Berat')
                    ->suffix(' g')
                    ->sortable(),
                Tables\Columns\TextColumn::make('stock')
                    ->label('Stok')
                    ->sortable()
                    ->badge()
                    ->color(fn(string $state): string => match (true) {
                        $state == 0 => 'danger',
                        $state < 5 => 'warning',
                        default => 'success',
                    }),
                Tables\Columns\ToggleColumn::make('is_active'),
                Tables\Columns\ToggleColumn::make('is_best_seller')->label('Best Seller'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
