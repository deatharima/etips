<?php

namespace App\Filament\Admin\Resources\VenueBranches\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VenueBranchInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('venue_id')
                    ->numeric(),
                TextEntry::make('name'),
                TextEntry::make('slug'),
                TextEntry::make('address'),
                TextEntry::make('phone')
                    ->placeholder('-'),
                TextEntry::make('working_hours')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('payment_provider'),
                TextEntry::make('payment_public_key'),
                TextEntry::make('payment_secret_key'),
                TextEntry::make('fee_percent')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
