<?php

namespace App\Http\Controllers;

use App\Services\RajaOngkirService;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    protected $rajaOngkir;

    public function __construct(RajaOngkirService $rajaOngkir)
    {
        $this->rajaOngkir = $rajaOngkir;
    }

    /**
     * Get provinces
     */
    public function getProvinces()
    {
        $provinces = $this->rajaOngkir->getProvinces();
        return response()->json($provinces);
    }

    /**
     * Get cities by province
     */
    public function getCities($provinceId)
    {
        $cities = $this->rajaOngkir->getCitiesByProvince($provinceId);
        return response()->json($cities);
    }

    /**
     * Get districts by city
     */
    public function getDistricts($cityId)
    {
        $districts = $this->rajaOngkir->getDistrictsByCity($cityId);
        return response()->json($districts);
    }

    /**
     * Calculate shipping costs
     */
    public function calculateCost(Request $request)
    {
        $validated = $request->validate([
            'destination_district_id' => 'required|integer',
            'weight' => 'nullable|integer|min:1',
        ]);

        $weight = $validated['weight'] ?? 1000; // Default 1kg

        $shippingCosts = $this->rajaOngkir->calculateShippingCost(
            $validated['destination_district_id'],
            $weight
        );

        if ($shippingCosts === null) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to calculate shipping costs. Please try again later.'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $shippingCosts
        ]);
    }

    /**
     * Search destination (Direct Search Method)
     */
    public function searchDestination(Request $request)
    {
        $validated = $request->validate([
            'search' => 'required|string|min:2',
            'limit' => 'nullable|integer|min:1|max:50',
        ]);

        $search = $validated['search'];
        $limit = $validated['limit'] ?? 10;

        $results = $this->rajaOngkir->searchDomesticDestination($search, $limit);

        return response()->json($results);
    }
}
