<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RajaOngkirService
{
    protected $apiKey;
    protected $originDistrictId;

    public function __construct()
    {
        $this->apiKey = config('services.rajaongkir.api_key');
        $this->originDistrictId = config('services.rajaongkir.origin_district_id');
    }

    /**
     * Get list of provinces
     */
    public function getProvinces()
    {
        try {
            $response = Http::withHeaders([
                'key' => $this->apiKey,
            ])->get(config('services.rajaongkir.urls.province'));

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('RajaOngkir API Error - Get Provinces', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('RajaOngkir Exception - Get Provinces: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get cities by province ID
     */
    public function getCitiesByProvince($provinceId)
    {
        try {
            $url = str_replace('{province_id}', $provinceId, config('services.rajaongkir.urls.city'));

            $response = Http::withHeaders([
                'key' => $this->apiKey,
            ])->get($url);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('RajaOngkir API Error - Get Cities', [
                'province_id' => $provinceId,
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('RajaOngkir Exception - Get Cities: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get districts by city ID
     */
    public function getDistrictsByCity($cityId)
    {
        try {
            $url = str_replace('{city_id}', $cityId, config('services.rajaongkir.urls.district'));

            $response = Http::withHeaders([
                'key' => $this->apiKey,
            ])->get($url);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('RajaOngkir API Error - Get Districts', [
                'city_id' => $cityId,
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('RajaOngkir Exception - Get Districts: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Calculate shipping cost
     *
     * @param int $destinationDistrictId
     * @param int $weight Weight in grams
     * @param string|null $courier Comma-separated courier codes (e.g., 'jne,tiki,pos')
     * @return array|null
     */
    public function calculateShippingCost($destinationDistrictId, $weight = 1000, $courier = null)
    {
        try {
            // Default couriers: Popular & reliable for e-commerce parcel delivery
            if (!$courier) {
                $courier = 'jne:sicepat:jnt:anteraja:ninja:pos:tiki:lion';
            }

            $response = Http::withHeaders([
                'key' => $this->apiKey,
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])->asForm()->post(config('services.rajaongkir.urls.cost_calculate'), [
                'origin' => $this->originDistrictId,
                'destination' => $destinationDistrictId,
                'weight' => $weight,
                'courier' => $courier,
                'price' => 'lowest'
            ]);

            if ($response->successful()) {
                $data = $response->json();

                // Parse response to extract shipping options
                return $this->parseShippingCosts($data);
            }

            Log::error('RajaOngkir API Error - Calculate Cost', [
                'origin' => $this->originDistrictId,
                'destination' => $destinationDistrictId,
                'weight' => $weight,
                'courier' => $courier,
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('RajaOngkir Exception - Calculate Cost: ' . $e->getMessage(), [
                'destination' => $destinationDistrictId,
                'weight' => $weight
            ]);
            return null;
        }
    }


    /**
     * Parse shipping costs from RajaOngkir response
     */
    protected function parseShippingCosts($data)
    {
        if (!isset($data['data']) || !is_array($data['data'])) {
            return [];
        }

        $shippingOptions = [];

        // Blacklist: Service codes yang pasti bukan paket biasa
        $blacklistedServiceCodes = [
            'T15',
            'T25',
            'T60',           // TIKI Motor
            'JTR',
            'JTR<130',
            'JTR>130',
            'JTR>200', // JNE Trucking
            'TRC',                         // TIKI Trucking
        ];

        // Blacklist: Keywords dalam service atau description
        $blacklistedKeywords = [
            'motor',
            'trucking',
            'kargo',
            'cargo',
            'dangerous goods',
            'valuable goods',
        ];

        // Max cost threshold untuk paket normal (dalam Rupiah)
        // Jika > threshold ini untuk 1kg, kemungkinan besar bukan paket biasa
        $maxCostThreshold = 100000; // Rp 100.000 per kg

        // RajaOngkir V2 returns flat array of shipping options
        foreach ($data['data'] as $option) {
            $courierCode = $option['code'] ?? 'unknown';
            $courierName = $option['name'] ?? 'Unknown Courier';
            $serviceName = $option['service'] ?? 'Regular';
            $description = $option['description'] ?? '';
            $cost = $option['cost'] ?? 0;
            $etd = $option['etd'] ?? 'N/A';

            // Filter 1: Blacklist service codes
            if (in_array(strtoupper($serviceName), $blacklistedServiceCodes)) {
                continue;
            }

            // Filter 2: Blacklist keywords in service name or description
            $combinedText = strtolower($serviceName . ' ' . $description);
            $shouldSkip = false;
            foreach ($blacklistedKeywords as $keyword) {
                if (strpos($combinedText, strtolower($keyword)) !== false) {
                    $shouldSkip = true;
                    break;
                }
            }
            if ($shouldSkip) {
                continue;
            }

            // Filter 3: Cost threshold (untuk 1kg, jika > 100rb pasti bukan paket biasa)
            if ($cost > $maxCostThreshold) {
                continue;
            }

            // Filter 4: Skip jika ETD tidak masuk akal (> 10 hari untuk paket biasa)
            $etdDays = $this->extractDaysFromEtd($etd);
            if ($etdDays !== null && $etdDays > 10) {
                continue;
            }

            $shippingOptions[] = [
                'courier_code' => strtoupper($courierCode),
                'courier_name' => $courierName,
                'service' => $serviceName,
                'description' => $description,
                'cost' => $cost,
                'etd' => $etd,
                'display_name' => strtoupper($courierCode) . ' - ' . $serviceName . ' (' . $etd . ')',
            ];
        }

        // Sort by cost (cheapest first)
        usort($shippingOptions, function ($a, $b) {
            return $a['cost'] <=> $b['cost'];
        });

        return $shippingOptions;
    }

    /**
     * Extract maximum days from ETD string
     * Examples: "2-3 day" => 3, "1 day" => 1, "24 day" => 24
     */
    protected function extractDaysFromEtd($etd)
    {
        if (empty($etd) || $etd === 'N/A' || $etd === '-' || $etd === '0-0 day') {
            return null;
        }

        // Extract all numbers from ETD
        preg_match_all('/\d+/', $etd, $matches);

        if (empty($matches[0])) {
            return null;
        }

        // Return the maximum number (e.g., "2-3 day" => 3)
        return max(array_map('intval', $matches[0]));
    }

    /**
     * Search domestic destination (Direct Search Method)
     */
    public function searchDomesticDestination($search, $limit = 10, $offset = 0)
    {
        try {
            $response = Http::withHeaders([
                'key' => $this->apiKey,
            ])->get(config('services.rajaongkir.urls.domestic_destination'), [
                'search' => $search,
                'limit' => $limit,
                'offset' => $offset
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('RajaOngkir API Error - Search Destination', [
                'search' => $search,
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('RajaOngkir Exception - Search Destination: ' . $e->getMessage());
            return null;
        }
    }
}
