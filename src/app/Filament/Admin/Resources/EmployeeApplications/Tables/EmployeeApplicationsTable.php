<?php

namespace App\Filament\Admin\Resources\EmployeeApplications\Tables;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class EmployeeApplicationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('employee.first_name')
                    ->label('Сотрудник')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('employee.email')
                    ->searchable(),

                TextColumn::make('branch.name')
                    ->label('Филиал')
                    ->searchable(),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state) => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                    })
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'pending' => 'Ожидает',
                        'approved' => 'Одобрено',
                        'rejected' => 'Отклонено',
                    }),

                TextColumn::make('created_at')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),

                Action::make('approve')
                    ->label('Одобрить')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(function ($record) {
                        return $record->status === 'pending'
                            && !$record->branch->employees()
                                ->whereKey($record->user_id)
                                ->exists();
                    })
                    ->action(function ($record) {

                        $record->update([
                            'status' => 'approved',
                            'reviewed_by' => Auth::id(),
                            'reviewed_at' => now(),
                        ]);

                        $record->branch->employees()->syncWithoutDetaching([
                            $record->user_id => [
                                'position' => 'other',
                                'is_active' => true,
                                'joined_at' => now(),
                            ],
                        ]);

                        Notification::make()
                            ->title('Заявка одобрена')
                            ->body($record->employee->first_name . ' был прикреплен к филиалу.')
                            ->success()
                            ->send();
                    }),

                Action::make('reject')
                    ->label('Отклонить')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(function ($record) {

                        $record->update([
                            'status' => 'rejected',
                            'reviewed_by' => Auth::id(),
                            'reviewed_at' => now(),
                        ]);

                        Notification::make()
                            ->title('Заявка отклонена')
                            ->body('Заявка ' . $record->employee->first_name . ' была отклонена.')
                            ->danger()
                            ->send();
                    }),

            ])


            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
