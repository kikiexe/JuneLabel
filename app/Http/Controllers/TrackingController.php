<?php

namespace App\Http\Controllers;

use App\Services\BinderByteService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingController extends Controller
{
    protected $service;

    public function __construct(BinderByteService $service)
    {
        $this->service = $service;
    }

    // Tampilkan halaman tracking
    public function index()
    {
        return Inertia::render('Information/TrackOrder', [
            'couriers' => $this->service->getCouriers(),
        ]);
    }

    // Handle API request untuk cek resi
    public function check(Request $request)
    {
        $request->validate([
            'courier' => 'required|string',
            'awb' => 'required|string',
        ]);

        $result = $this->service->track($request->courier, $request->awb);

        return response()->json($result);
    }
}
