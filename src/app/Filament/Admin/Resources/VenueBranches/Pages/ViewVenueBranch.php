<?php

namespace App\Filament\Admin\Resources\VenueBranches\Pages;

use App\Filament\Admin\Resources\VenueBranches\VenueBranchResource;
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
