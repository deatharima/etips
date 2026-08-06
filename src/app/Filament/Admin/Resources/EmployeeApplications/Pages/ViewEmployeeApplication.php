<?php

namespace App\Filament\Admin\Resources\EmployeeApplications\Pages;

use App\Filament\Admin\Resources\EmployeeApplications\EmployeeApplicationResource;
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
