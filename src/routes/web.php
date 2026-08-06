<?php

use App\Http\Controllers\Employee\AnalyticsController;
use App\Http\Controllers\Employee\ApplicationController;
use App\Http\Controllers\Employee\QrController;
use App\Http\Controllers\Employee\WithdrawController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicBranchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Employee\DashboardController;
use App\Http\Controllers\Employee\JoinBranchController;
use App\Http\Controllers\Employee\MyBranchesController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();

    if (!$user) {
        return redirect('/login');
    }

    if ($user->role === 'admin') {
        return redirect('/admin');
    }

    if ($user->role === 'manager') {
        return redirect('/manager');
    }

    if ($user->role === 'employee') {
        return redirect('/employee');
    }

    return redirect('/');

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/branch/{token}', [PublicBranchController::class, 'show'])
    ->name('public.branch');

Route::post('/branch/{token}/tips', [PublicBranchController::class, 'store'])
    ->name('public.branch.tip');

Route::get('/employee-tip/{token}', [PublicBranchController::class, 'employeeTip'])
    ->name('public.employee.tip');

Route::get('/tip/success', function () {
    return Inertia::render('Public/TipSuccess');
})->name('public.tip.success');

Route::middleware(['auth'])->prefix('employee')->group(function () {

    Route::get('/', [DashboardController::class, 'index'])
        ->name('employee.dashboard');

    Route::get('/branches', [JoinBranchController::class, 'index'])
        ->name('employee.branches');

});

Route::get('/employee/branches/{venue}', [JoinBranchController::class, 'show'])
    ->name('employee.branches.show');

Route::post(
    '/employee/branches/{branch}/apply',
    [JoinBranchController::class, 'apply']
)->name('employee.branches.apply');

Route::middleware(['auth'])->group(function () {

    Route::get('/employee/my-branches', [MyBranchesController::class, 'index'])
        ->name('employee.branches');

});

Route::get(
    '/employee/analytics', [AnalyticsController::class, 'index'])->middleware('auth')->name('employee.analytics');

Route::middleware('auth')->prefix('employee')->group(function () {

    Route::get('/my-qr', [QrController::class, 'index'])->name('employee.qr');

    Route::post('/my-qr/regenerate', [QrController::class, 'regenerate'])->name('employee.qr.regenerate');

    });

Route::post('/employee-tip/{token}', [PublicBranchController::class, 'storeEmployeeTip'])->name('public.employee.tip.store');

Route::middleware('auth')->prefix('employee')->group(function () {

    Route::get('/applications', [ApplicationController::class, 'index'])->name('employee.applications');
    });

Route::middleware('auth') ->prefix('employee')->group(function () {
    Route::get('/withdraw', [WithdrawController::class, 'index'])->name('employee.withdraw');
});

require __DIR__.'/auth.php';
