<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Inertia\Inertia;
use App\Models\VenueBranch;
use App\Models\EmployeeApplication;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class JoinBranchController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $venues = Venue::withCount('branches')
            ->orderBy('name')
            ->get();
            
        $pendingApplications = EmployeeApplication::where('user_id', $user->id)
            ->where('status', 'pending')
            ->get();

        return Inertia::render('Employee/Branches', [
            'venues' => $venues,
            'pendingApplications' => $pendingApplications,
        ]);
    }

    public function show(Venue $venue)
    {
        $user = Auth::user();
        
        $venue->load('branches');
        
        $pendingApplications = EmployeeApplication::where('user_id', $user->id)
            ->where('status', 'pending')
            ->get();

        return Inertia::render('Employee/Branches', [
            'venue' => $venue,
            'pendingApplications' => $pendingApplications,
        ]);
    }

    public function apply(Request $request, VenueBranch $branch)
    {
        $request->validate([
            'position' => 'required|string',
        ]);
        
        $user = Auth::user();

        $exists = EmployeeApplication::where('user_id', $user->id)
            ->where('branch_id', $branch->id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Заявка уже отправлена.');
        }

        EmployeeApplication::create([
            'user_id' => $user->id,
            'branch_id' => $branch->id,
            'position' => $request->position,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Заявка отправлена.');
    }
}
