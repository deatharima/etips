<?php

namespace App\Filament\Manager\Resources\EmployeeApplications;

use App\Filament\Manager\Resources\EmployeeApplications\Pages\ListEmployeeApplications;
use App\Filament\Manager\Resources\EmployeeApplications\Pages\ViewEmployeeApplication;
use App\Filament\Manager\Resources\EmployeeApplications\Schemas\EmployeeApplicationForm;
use App\Filament\Manager\Resources\EmployeeApplications\Schemas\EmployeeApplicationInfolist;
use App\Filament\Manager\Resources\EmployeeApplications\Tables\EmployeeApplicationsTable;
use App\Models\EmployeeApplication;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

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

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->whereHas('branch.venue', function (Builder $query) {
                $query->where('owner_id', auth()->id());
            });
    }

}
