<?php

namespace App\Filament\Manager\Resources\EmployeeApplications\Pages;

use App\Filament\Manager\Resources\EmployeeApplications\EmployeeApplicationResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewEmployeeApplication extends ViewRecord
{
    protected static string $resource = EmployeeApplicationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
