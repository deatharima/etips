<?php

namespace App\Filament\Manager\Resources\Tips\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class TipInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('branch.name')
                    ->label('Branch'),
                TextEntry::make('employee.id')
                    ->label('Employee'),
                TextEntry::make('amount')
                    ->numeric(),
                TextEntry::make('platform_fee')
                    ->numeric(),
                TextEntry::make('employee_amount')
                    ->numeric(),
                TextEntry::make('status'),
                TextEntry::make('guest_name')
                    ->placeholder('-'),
                TextEntry::make('comment')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('paid_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
