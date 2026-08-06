<?php

namespace App\Filament\Manager\Widgets;

use App\Models\Tip;
use App\Models\User;
use App\Models\VenueBranch;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class ManagerTipsStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $managerId = Auth::id();

        $now = now();
        $todayStart = $now->startOfDay();
        $todayEnd = $now->endOfDay();

        $branches = VenueBranch::whereHas('venue', function ($query) use ($managerId) {
            $query->where('owner_id', $managerId);
        })->count();

        $employees = User::where('role', 'employee')
            ->whereHas('branches', function ($query) use ($managerId) {
                $query->whereHas('venue', function ($query) use ($managerId) {
                    $query->where('owner_id', $managerId);
                });
            })
            ->count();

        $tipsToday = Tip::whereBetween('paid_at', [$todayStart, $todayEnd])
            ->where('status', 'paid')
            ->whereHas('branch', function ($query) use ($managerId) {
                $query->whereHas('venue', function ($query) use ($managerId) {
                    $query->where('owner_id', $managerId);
                });
            })
            ->sum('amount');

        $tipsCountToday = Tip::whereBetween('paid_at', [$todayStart, $todayEnd])
            ->where('status', 'paid')
            ->whereHas('branch', function ($query) use ($managerId) {
                $query->whereHas('venue', function ($query) use ($managerId) {
                    $query->where('owner_id', $managerId);
                });
            })
            ->count();

        return [
            Stat::make('Чаевых сегодня', '₸ ' . number_format($tipsToday, 0, ',', ' '))
                ->description('За сегодня')
                ->descriptionIcon('heroicon-o-currency-dollar')
                ->color('primary'),
            Stat::make('Количество чаевых', $tipsCountToday)
                ->description('За сегодня')
                ->descriptionIcon('heroicon-o-currency-dollar')
                ->color('info'),
            Stat::make('Активных сотрудников', $employees)
                ->description('В ваших заведениях')
                ->descriptionIcon('heroicon-o-users')
                ->color('warning'),
            Stat::make('Филиалов', $branches)
                ->description('Ваших заведений')
                ->descriptionIcon('heroicon-o-building-office-2')
                ->color('success'),
        ];
    }
}
