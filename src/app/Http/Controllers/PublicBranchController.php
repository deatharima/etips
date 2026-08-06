<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use App\Models\User;
use App\Models\VenueBranch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicBranchController extends Controller
{
    public function show(string $token)
    {
        $branch = VenueBranch::with([
            'venue',
            'employees' => function ($query) {
                $query->wherePivot('is_active', true)
                    ->orderBy('first_name');
            },
        ])
            ->where('qr_token', $token)
            ->firstOrFail();

        return Inertia::render('Public/Branch', [
            'branch' => $branch,
        ]);
    }

    public function store(Request $request, string $token)
    {
        $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'amount' => ['required', 'numeric', 'min:100'],
            'comment' => ['nullable', 'string', 'max:255'],
            'guest_name' => ['nullable', 'string', 'max:100'],
        ]);

        $branch = VenueBranch::where('qr_token', $token)->firstOrFail();

        $employee = $branch->employees()
            ->where('users.id', $request->user_id)
            ->firstOrFail();

        $amount = $request->amount;

        $platformFee = round($amount * ($branch->fee_percent / 100), 2);

        $employeeAmount = $amount - $platformFee;

        Tip::create([
            'branch_id'       => $branch->id,
            'employee_id'     => $employee->id,
            'amount'          => $amount,
            'platform_fee'    => $platformFee,
            'employee_amount' => $employeeAmount,
            'status'          => 'pending',
            'guest_name'      => $request->guest_name,
            'comment'         => $request->comment,
        ]);

        return redirect()->route('public.tip.success');
    }

    public function employeeTip(string $token)
    {
        $employee = User::where('employee_qr_token', $token)->firstOrFail();

        return Inertia::render('Public/EmployeeTip', [
            'employee' => $employee,
        ]);
    }

    public function storeEmployeeTip(Request $request, string $token)
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:100'],
            'comment' => ['nullable', 'string', 'max:255'],
            'guest_name' => ['nullable', 'string', 'max:100'],
        ]);

        $employee = User::where('employee_qr_token', $token)
            ->firstOrFail();

        // Получаем филиал, где сотрудник сейчас работает
        $branch = $employee->branches()
            ->wherePivot('is_active', true)
            ->firstOrFail();

        $amount = $request->amount;

        $platformFee = round(
            $amount * ($branch->fee_percent / 100),
            2
        );

        $employeeAmount = $amount - $platformFee;

        Tip::create([
            'branch_id' => $branch->id,
            'employee_id' => $employee->id,
            'amount' => $amount,
            'platform_fee' => $platformFee,
            'employee_amount' => $employeeAmount,
            'status' => 'pending',
            'guest_name' => $request->guest_name,
            'comment' => $request->comment,
        ]);

        return redirect()->route('public.tip.success');
    }

}
