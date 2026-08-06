<?php

namespace App\Filament\Manager\Resources\EmployeeApplications\Tables;

use Filament\Actions\Action;
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

                TextColumn::make('employee.email'),

                TextColumn::make('branch.name')
                    ->label('Филиал'),

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
                    ->dateTime('d.m.Y H:i'),

            ])

            ->recordActions([

                Action::make('approve')
                    ->label('Одобрить')
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(function ($record) {

                        $record->update([
                            'status' => 'approved',
                            'reviewed_by' => Auth::id(),
                            'reviewed_at' => now(),
                        ]);

                        $record->branch
                            ->employees()
                            ->syncWithoutDetaching([
                                $record->user_id => [
                                    'position' => 'other',
                                    'joined_at' => now(),
                                    'is_active' => true,
                                ],
                            ]);

                        Notification::make()
                            ->title('Заявка одобрена')
                            ->success()
                            ->send();

                    }),

                Action::make('reject')
                    ->label('Отклонить')
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
                            ->danger()
                            ->send();

                    }),

            ]);
    }
}
