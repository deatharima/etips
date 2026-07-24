<?php

namespace App\Filament\Resources\VenueBranches\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Illuminate\Support\Str;
use Filament\Tables\Table;

class VenueBranchesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('venue.name')
                    ->label('Venue')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('slug')
                    ->badge()
                    ->copyable(),

                TextColumn::make('qr_token')
                    ->label('Public link')
                    ->formatStateUsing(fn ($state) => url('/branch/' . $state))
                    ->url(fn ($record) => url('/branch/' . $record->qr_token))
                    ->openUrlInNewTab(),

                TextColumn::make('address')
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->address),

                TextColumn::make('phone'),

                TextColumn::make('payment_provider')
                    ->badge(),

                TextColumn::make('fee_percent')
                    ->suffix('%'),

                IconColumn::make('is_active')
                    ->boolean(),

                TextColumn::make('created_at')
                    ->dateTime('d.m.Y H:i'),
            ]);
    }
}
