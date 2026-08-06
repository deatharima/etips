<?php

namespace App\Filament\Manager\Resources\VenueBranches\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class VenueBranchForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('venue_id')
                    ->relationship('venue', 'name')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('address')
                    ->required(),
                TextInput::make('phone')
                    ->tel(),
                Textarea::make('working_hours')
                    ->columnSpanFull(),
                TextInput::make('payment_provider')
                    ->required(),
                TextInput::make('payment_public_key'),
                TextInput::make('payment_secret_key'),
                TextInput::make('fee_percent')
                    ->required()
                    ->numeric()
                    ->default(5),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
