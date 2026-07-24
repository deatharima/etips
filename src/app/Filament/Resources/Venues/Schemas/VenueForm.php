<?php

namespace App\Filament\Resources\Venues\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class VenueForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('owner_id')
                    ->relationship('owner', 'email')
                    ->searchable()
                    ->required(),

                TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('slug')
                    ->required()
                    ->helperText('Branch URL'),

                Textarea::make('description')
                    ->rows(4),

                TextInput::make('phone')
                    ->tel()
                    ->placeholder('+7 701 234 56 78')
                    ->rule('regex:/^\+[0-9]{10,15}$/'),

                TextInput::make('email')
                    ->email(),

                TextInput::make('website')
                    ->url(),

                FileUpload::make('logo')
                    ->image()
                    ->directory('venues/logos'),

                FileUpload::make('cover')
                    ->image()
                    ->directory('venues/covers'),
            ]);
    }
}
