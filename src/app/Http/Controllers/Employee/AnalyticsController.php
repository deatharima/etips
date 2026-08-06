<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Tip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $from = $request->filled('from')
            ? \Carbon\Carbon::parse($request->from)->startOfDay()
            : now()->startOfMonth();

        $to = $request->filled('to')
            ? \Carbon\Carbon::parse($request->to)->endOfDay()
            : now()->endOfMonth();

        $tips = Tip::with('branch')
            ->where('employee_id', $user->id)
            ->where('status', 'paid')
            ->whereBetween('paid_at', [$from, $to])
            ->orderBy('paid_at')
            ->get();

        $income = $tips->sum('employee_amount');

        $count = $tips->count();

        $average = $count
            ? round($income / $count)
            : 0;

        $max = $tips->max('employee_amount') ?? 0;

        $chart = $tips
            ->groupBy(fn ($tip) => $tip->paid_at->format('d.m'))
            ->map(fn ($day) => $day->sum('employee_amount'));

        return Inertia::render('Employee/Analytics', [

            'from' => $from->toDateString(),

            'to' => $to->toDateString(),

            'income' => $income,

            'count' => $count,

            'average' => $average,

            'max' => $max,

            'tips' => $tips,

            'chart' => [

                'labels' => $chart->keys()->values(),

                'values' => $chart->values(),

            ],

        ]);
    }
}
