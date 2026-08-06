<?php

namespace App\Filament\Admin\Resources\EmployeeApplications;

use App\Filament\Admin\Resources\EmployeeApplications\Pages\ListEmployeeApplications;
use App\Filament\Admin\Resources\EmployeeApplications\Pages\ViewEmployeeApplication;
use App\Filament\Admin\Resources\EmployeeApplications\Schemas\EmployeeApplicationForm;
use App\Filament\Admin\Resources\EmployeeApplications\Schemas\EmployeeApplicationInfolist;
use App\Filament\Admin\Resources\EmployeeApplications\Tables\EmployeeApplicationsTable;
use App\Models\EmployeeApplication;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class EmployeeApplicationResource extends Resource
{
    protected static ?string $model = EmployeeApplication::class;

    protected static ?string $navigationLabel = 'Заявки сотрудников';

    protected static ?string $pluralModelLabel = 'Заявки сотрудников';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Schema $schema): Schema
    {
        return EmployeeApplicationForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return EmployeeApplicationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EmployeeApplicationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListEmployeeApplications::route('/'),
            'view' => ViewEmployeeApplication::route('/{record}'),
        ];
    }
}
