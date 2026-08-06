<?php

namespace App\Filament\Admin\Widgets;

use App\Models\Tip;
use App\Models\User;
use App\Models\VenueBranch;
use App\Models\Venue;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TipsStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $venues = Venue::count();
        $branches = VenueBranch::count();
        $employees = User::where('role', 'employee')->count();

        $now = now();
        $monthStart = $now->startOfMonth();
        $monthEnd = $now->endOfMonth();

        $tipsThisMonth = Tip::whereBetween('paid_at', [$monthStart, $monthEnd])
            ->where('status', 'paid')
            ->sum('amount');

        $platformFee = Tip::whereBetween('paid_at', [$monthStart, $monthEnd])
            ->where('status', 'paid')
            ->sum('platform_fee');

        return [
            Stat::make('Заведений', $venues)
                ->description('Всего заведений')
                ->descriptionIcon('heroicon-o-building-office-2')
                ->color('primary'),
            Stat::make('Филиалов', $branches)
                ->description('Всего филиалов')
                ->descriptionIcon('heroicon-o-rectangle-stack')
                ->color('info'),
            Stat::make('Сотрудников', $employees)
                ->description('Зарегистрировано')
                ->descriptionIcon('heroicon-o-users')
                ->color('warning'),
            Stat::make('Чаевых за месяц', '₸ ' . number_format($tipsThisMonth, 0, ',', ' '))
                ->description('За текущий месяц')
                ->descriptionIcon('heroicon-o-currency-dollar')
                ->color('success'),
            Stat::make('Доход платформы', '₸ ' . number_format($platformFee, 0, ',', ' '))
                ->description('За текущий месяц')
                ->descriptionIcon('heroicon-o-banknotes')
                ->color('danger'),
        ];
    }
}
