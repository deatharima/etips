<?php

namespace App\Filament\Manager\Resources\VenueBranches;

use App\Filament\Manager\Resources\VenueBranches\Pages\CreateVenueBranch;
use App\Filament\Manager\Resources\VenueBranches\Pages\EditVenueBranch;
use App\Filament\Manager\Resources\VenueBranches\Pages\ListVenueBranches;
use App\Filament\Manager\Resources\VenueBranches\Pages\ViewVenueBranch;
use App\Filament\Manager\Resources\VenueBranches\Schemas\VenueBranchForm;
use App\Filament\Manager\Resources\VenueBranches\Schemas\VenueBranchInfolist;
use App\Filament\Manager\Resources\VenueBranches\Tables\VenueBranchesTable;
use App\Filament\Manager\Resources\VenueBranches\RelationManagers\ManagerEmployeesRelationManager;
use App\Models\VenueBranch;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class   VenueBranchResource extends Resource
{
    protected static ?string $model = VenueBranch::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationLabel = 'Филиалы';

    protected static ?string $pluralModelLabel = 'Филиалы';

    protected static string|null|\UnitEnum $navigationGroup = 'Бизнес';

    protected static ?int $navigationSort = 1;

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
            ManagerEmployeesRelationManager::class,
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

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->whereHas('venue', function (Builder $query) {
                $query->where('owner_id', auth()->id());
            });
    }
}
