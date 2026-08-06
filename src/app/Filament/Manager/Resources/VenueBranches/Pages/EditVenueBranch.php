<?php

namespace App\Filament\Manager\Resources\VenueBranches\Pages;

use App\Filament\Manager\Resources\VenueBranches\VenueBranchResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditVenueBranch extends EditRecord
{
    protected static string $resource = VenueBranchResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
