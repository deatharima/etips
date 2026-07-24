<?php

namespace App\Filament\Resources\VenueBranches\Pages;

use App\Filament\Resources\VenueBranches\VenueBranchResource;
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
