<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Tip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $from = $request->filled('from')
            ? Carbon::parse($request->from)->startOfDay()
            : now()->startOfMonth();

        $to = $request->filled('to')
            ? Carbon::parse($request->to)->endOfDay()
            : now()->endOfMonth();

        $today = Tip::where('employee_id', $user->id)
            ->where('status', 'paid')
            ->whereDate('paid_at', today())
            ->sum('employee_amount');

//        $today = Tip::where('employee_id', $user->id)
//            ->whereDate('created_at', today())
//            ->sum('employee_amount');

        $month = Tip::where('employee_id', $user->id)
            ->where('status', 'paid')
            ->whereMonth('paid_at', now()->month)
            ->whereYear('paid_at', now()->year)
            ->sum('employee_amount');

        $total = Tip::where('employee_id', $user->id)
            ->where('status', 'paid')
            ->sum('employee_amount');

        $pendingBalance = Tip::where('employee_id', $user->id)
            ->where('status', 'pending')
            ->sum('employee_amount');

        $tips = Tip::with('branch')
            ->where('employee_id', $user->id)
            ->where('status', 'paid')
            ->latest('paid_at')
            ->take(10)
            ->get();

        return Inertia::render('Employee/Dashboard', [
            'user' => auth()->user(),
            'from' => $from->toDateString(),
            'to' => $to->toDateString(),

            'selectedTotal' => $tips->sum('employee_amount'),

            'selectedCount' => $tips->count(),

            'selectedAverage' => round(
                $tips->avg('employee_amount') ?? 0,
                2
            ),

            'tips' => $tips,
            'today' => $today,
            'month' => $month,
            'total' => $total,
            'pendingBalance' => $pendingBalance,
        ]);
    }
}
