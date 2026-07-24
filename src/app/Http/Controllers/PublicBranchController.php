<?php

namespace App\Http\Controllers;

use App\Models\VenueBranch;
use Illuminate\Http\Request;

class PublicBranchController extends Controller
{
    public function show(string $token)
    {
        $branch = VenueBranch::where('qr_token', $token)->firstOrFail();
        return view('public.branch', compact('branch'));
    }
}
