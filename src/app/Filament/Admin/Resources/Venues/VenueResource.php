<?php

namespace App\Filament\Admin\Resources\Venues;

use App\Filament\Admin\Resources\Venues\Pages\CreateVenue;
use App\Filament\Admin\Resources\Venues\Pages\EditVenue;
use App\Filament\Admin\Resources\Venues\Pages\ListVenues;
use App\Filament\Admin\Resources\Venues\Pages\ViewVenue;
use App\Filament\Admin\Resources\Venues\Schemas\VenueForm;
use App\Filament\Admin\Resources\Venues\Schemas\VenueInfolist;
use App\Models\Venue;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VenueResource extends Resource
{
    protected static ?string $model = Venue::class;

    protected static ?string $navigationLabel = 'Заведения';

    protected static ?string $pluralModelLabel = 'Заведения';

    protected static ?string $modelLabel = 'Заведение';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return VenueForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return VenueInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo')
                    ->circular(),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('owner.email')
                    ->label('Владелец')
                    ->searchable(),

                TextColumn::make('created_at')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc');
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
            'index' => ListVenues::route('/'),
            'create' => CreateVenue::route('/create'),
            'view' => ViewVenue::route('/{record}'),
            'edit' => EditVenue::route('/{record}/edit'),
        ];
    }
}
