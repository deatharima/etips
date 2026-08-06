<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\EmployeeApplication;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = EmployeeApplication::with([
            'branch.venue'
        ])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Employee/Applications', [

            'applications' => $applications,

        ]);
    }
}
