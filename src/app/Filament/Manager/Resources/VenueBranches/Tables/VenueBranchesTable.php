<?php

namespace App\Filament\Manager\Resources\VenueBranches\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions\Action;

class VenueBranchesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('venue.name')
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('slug')
                    ->badge()
                    ->copyable(),

                TextColumn::make('qr_token')
                    ->label('Публичная ссылка')
                    ->formatStateUsing(fn ($state) => url('/branch/' . $state))
                    ->url(fn ($record) => url('/branch/' . $record->qr_token))
                    ->openUrlInNewTab(),
                TextColumn::make('address')
                    ->searchable(),
                TextColumn::make('phone')
                    ->searchable(),
                TextColumn::make('payment_provider')
                    ->searchable(),
                TextColumn::make('payment_public_key')
                    ->searchable(),
                TextColumn::make('payment_secret_key')
                    ->searchable(),
                TextColumn::make('fee_percent')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                Action::make('qr')
                    ->label('QR код')
                    ->icon('heroicon-o-qr-code')
                    ->modalHeading('QR код филиала')
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Закрыть')
                    ->modalContent(fn ($record) => view(
                        'qr-code',
                        ['record' => $record]
                    )),

                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
