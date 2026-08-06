<?php

namespace App\Filament\Manager\Resources\VenueBranches\RelationManagers;

use App\Models\User;
use Filament\Actions\AttachAction;
use Filament\Actions\CreateAction;
use Filament\Actions\DetachAction;
use Filament\Forms\Components\Select;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ManagerEmployeesRelationManager extends RelationManager
{
    protected static string $relationship = 'employees';

    public function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('first_name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('last_name')
                    ->searchable(),

                TextColumn::make('pivot.position')
                    ->badge(),

                IconColumn::make('pivot.is_active')
                    ->label('Active')
                    ->boolean(),

                TextColumn::make('pivot.joined_at')
                    ->label('Joined')
                    ->date(),
            ])

            ->headerActions([
                AttachAction::make()
                    ->recordSelectOptionsQuery(fn () => User::query()->where('role', 'employee'))
                    ->form([
                        Select::make('position')
                            ->required()
                            ->options([
                                'waiter' => 'Waiter',
                                'barista' => 'Barista',
                                'bartender' => 'Bartender',
                                'cashier' => 'Cashier',
                                'administrator' => 'Administrator',
                                'cook' => 'Cook',
                                'other' => 'Other',
                            ]),
                    ]),
            ])

            ->recordActions([
                DetachAction::make()
                    ->requiresConfirmation()
            ]);
    }
}
