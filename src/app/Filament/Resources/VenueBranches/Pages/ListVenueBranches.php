<?php

namespace App\Filament\Resources\VenueBranches\Pages;

use App\Filament\Resources\VenueBranches\VenueBranchResource;
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
