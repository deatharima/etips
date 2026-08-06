<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class QrController extends Controller
{
    public function index()
    {
        $employee = Auth::user();

        if (!$employee->employee_qr_token) {

            $employee->update([
                'employee_qr_token' => (string) Str::uuid(),
            ]);

            $employee->refresh();
        }

        $renderer = new ImageRenderer(
            new RendererStyle(300),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        $qr = $writer->writeString(
            route('public.employee.tip', $employee->employee_qr_token)
        );

        return Inertia::render('Employee/MyQr', [

            'employee' => $employee,

            'qr' => $qr,

        ]);
    }

    public function regenerate()
    {
        $employee = Auth::user();

        $employee->update([
            'employee_qr_token' => (string) Str::uuid(),
        ]);

        return redirect()->route('employee.qr');
    }
}
