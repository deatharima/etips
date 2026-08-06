<?php

namespace App\Filament\Manager\Resources\Employees\Pages;

use App\Filament\Manager\Resources\Employees\EmployeeResource;
use Filament\Resources\Pages\CreateRecord;

class CreateEmployee extends CreateRecord
{
    protected static string $resource = EmployeeResource::class;
}
