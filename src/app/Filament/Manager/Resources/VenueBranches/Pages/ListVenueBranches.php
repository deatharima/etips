<?php

namespace App\Filament\Manager\Resources\VenueBranches\Pages;

use App\Filament\Manager\Resources\VenueBranches\VenueBranchResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListVenueBranches extends ListRecords
{
    protected static string $resource = VenueBranchResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
