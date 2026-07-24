<?php

namespace App\Filament\Resources\EmployeeApplications\Pages;

use App\Filament\Resources\EmployeeApplications\EmployeeApplicationResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditEmployeeApplication extends EditRecord
{
    protected static string $resource = EmployeeApplicationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
