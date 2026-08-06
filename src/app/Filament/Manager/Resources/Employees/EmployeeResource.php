<?php

namespace App\Filament\Manager\Resources\Employees;

use App\Filament\Manager\Resources\Employees\Pages\CreateEmployee;
use App\Filament\Manager\Resources\Employees\Pages\EditEmployee;
use App\Filament\Manager\Resources\Employees\Pages\ListEmployees;
use App\Filament\Manager\Resources\Employees\Pages\ViewEmployee;
use App\Filament\Manager\Resources\Employees\Schemas\EmployeeForm;
use App\Filament\Manager\Resources\Employees\Schemas\EmployeeInfolist;
use App\Filament\Manager\Resources\Employees\Tables\EmployeesTable;
use App\Models\User;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class EmployeeResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationLabel = 'Сотрудники';

    protected static ?string $pluralModelLabel = 'Сотрудники';

    protected static string|null|\UnitEnum $navigationGroup = 'Персонал';

    protected static ?int $navigationSort = 2;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    protected static ?string $recordTitleAttribute = 'first_name';

    public static function form(Schema $schema): Schema
    {
        return EmployeeForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return EmployeeInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EmployeesTable::configure($table);
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
            'index' => ListEmployees::route('/'),
            'view' => ViewEmployee::route('/{record}'),
            'edit' => EditEmployee::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $manager = Auth::user();

        $branchIds = $manager->venues()
            ->with('branches')
            ->get()
            ->pluck('branches')
            ->flatten()
            ->pluck('id');

        return parent::getEloquentQuery()
            ->whereHas('branches', function ($query) use ($branchIds) {
                $query->whereIn('venue_branches.id', $branchIds);
            });
    }
}
