<?php

namespace App\Filament\Resources\VenueBranches\Pages;

use App\Filament\Resources\VenueBranches\VenueBranchResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewVenueBranch extends ViewRecord
{
    protected static string $resource = VenueBranchResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),

        ];
    }
}
