<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MyBranchesController extends Controller
{
    public function index()
    {
        $branches = Auth::user()
            ->branches()
            ->with('venue')
            ->get();

        return Inertia::render('Employee/MyBranches', [
            'branches' => $branches,
        ]);
    }
}
