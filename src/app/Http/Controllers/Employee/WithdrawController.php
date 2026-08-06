<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WithdrawController extends Controller{
    public function index(){
        $user = Auth::user();
        return Inertia::render('Employee/Withdraw', ['availableBalance' => $user->available_balance]);
    }
}
