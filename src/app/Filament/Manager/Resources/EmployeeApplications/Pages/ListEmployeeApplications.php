<?php

namespace App\Filament\Manager\Resources\EmployeeApplications\Pages;

use App\Filament\Manager\Resources\EmployeeApplications\EmployeeApplicationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEmployeeApplications extends ListRecords
{
    protected static string $resource = EmployeeApplicationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
