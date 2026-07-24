<?php

namespace App\Filament\Resources\VenueBranches\RelationManagers;

use App\Filament\Resources\Users\UserResource;
use Filament\Actions\CreateAction;
use Filament\Actions\DetachAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class EmployeesRelationManager extends RelationManager
{
    protected static string $relationship = 'employees';

    protected static ?string $relatedResource = UserResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('first_name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('last_name')
                    ->searchable(),

                TextColumn::make('email')
                    ->searchable(),

                TextColumn::make('pivot.position')
                    ->label('Position'),

                IconColumn::make('pivot.is_active')
                    ->label('Active')
                    ->boolean(),

                TextColumn::make('pivot.joined_at')
                    ->label('Joined')
                    ->dateTime('d.m.Y'),

            ])
            ->headerActions([

            ])
            ->recordActions([
                DetachAction::make()
                    ->requiresConfirmation()
            ]);

    }
}
