<?php

namespace App\Filament\Resources\VenueBranches\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class VenueBranchForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('venue_id')
                    ->relationship('venue', 'name')
                    ->required()
                    ->searchable(),

                TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function ($state, callable $set, callable $get) {
                        if (blank($get('slug'))) {
                            $set('slug', Str::slug($state));
                        }
                    }),

                TextInput::make('slug')
                    ->required()
                    ->helperText('Branch URL'),

                Textarea::make('address')
                    ->rows(3)
                    ->required(),

                TextInput::make('phone')
                    ->tel()
                    ->placeholder('+7 701 234 56 78')
                    ->rule('regex:/^\+[0-9]{10,15}$/'),

                Select::make('payment_provider')
                    ->options([
                        'kaspi' => 'Kaspi',
                        'halyk' => 'Halyk',
                        'jusan' => 'Jusan',
                        'freedom' => 'Freedom',
                    ])
                    ->required(),

                KeyValue::make('payment_credentials')
                    ->keyLabel('Ключ')
                    ->valueLabel('Значение')
                    ->columnSpanFull(),

                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}
