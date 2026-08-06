<?php

namespace App\Filament\Manager\Resources\Tips\Pages;

use App\Filament\Manager\Resources\Tips\TipResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTip extends ViewRecord
{
    protected static string $resource = TipResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
