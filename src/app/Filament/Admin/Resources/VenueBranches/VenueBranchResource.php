<?php

namespace App\Filament\Admin\Resources\VenueBranches;

use App\Filament\Admin\Resources\VenueBranches\Pages\CreateVenueBranch;
use App\Filament\Admin\Resources\VenueBranches\Pages\EditVenueBranch;
use App\Filament\Admin\Resources\VenueBranches\Pages\ListVenueBranches;
use App\Filament\Admin\Resources\VenueBranches\Pages\ViewVenueBranch;
use App\Filament\Admin\Resources\VenueBranches\RelationManagers\EmployeesRelationManager;
use App\Filament\Admin\Resources\VenueBranches\Schemas\VenueBranchForm;
use App\Filament\Admin\Resources\VenueBranches\Schemas\VenueBranchInfolist;
use App\Filament\Admin\Resources\VenueBranches\Tables\VenueBranchesTable;
use App\Models\VenueBranch;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VenueBranchResource extends Resource
{
    protected static ?string $model = VenueBranch::class;

    protected static ?string $navigationLabel = 'Филиалы';

    protected static ?string $pluralModelLabel = 'Филиалы';

    protected static ?string $modelLabel = 'Филиал';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return VenueBranchForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return VenueBranchInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VenueBranchesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            EmployeesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVenueBranches::route('/'),
            'create' => CreateVenueBranch::route('/create'),
            'view' => ViewVenueBranch::route('/{record}'),
            'edit' => EditVenueBranch::route('/{record}/edit'),
        ];
    }
}
