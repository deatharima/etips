<?php

namespace App\Filament\Manager\Resources\Tips\Pages;

use App\Filament\Manager\Resources\Tips\TipResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTips extends ListRecords
{
    protected static string $resource = TipResource::class;

    protected function getHeaderActions(): array
    {
        return [
        ];
    }
}
