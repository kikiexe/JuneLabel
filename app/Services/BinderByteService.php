<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class BinderByteService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.binderbyte.com/v1';

    public function __construct()
    {
        $this->apiKey = env('BINDERBYTE_RESI');
    }

    /**
     * Track Order by AWB (Resi)
     */
    public function track($courier, $awb)
    {
        try {
            $response = Http::get("{$this->baseUrl}/track", [
                'api_key' => $this->apiKey,
                'courier' => $courier,
                'awb' => $awb,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return [
                'status' => 500,
                'message' => 'Terjadi kesalahan saat menghubungi server tracking.',
            ];
        }
    }

    /**
     * Get Supported Couriers
     */
    public function getCouriers()
    {
        return [
            ['code' => 'jne', 'name' => 'JNE'],
            ['code' => 'pos', 'name' => 'POS Indonesia'],
            ['code' => 'jnt', 'name' => 'J&T'],
            ['code' => 'jnt_cargo', 'name' => 'J&T Cargo'],
            ['code' => 'sicepat', 'name' => 'SiCepat'],
            ['code' => 'tiki', 'name' => 'TIKI'],
            ['code' => 'anteraja', 'name' => 'AnterAja'],
            ['code' => 'wahana', 'name' => 'Wahana'],
            ['code' => 'ninja', 'name' => 'Ninja Xpress'],
            ['code' => 'lion', 'name' => 'Lion Parcel'],
            ['code' => 'ide', 'name' => 'ID Express'],
            ['code' => 'spx', 'name' => 'Shopee Express'],
            ['code' => 'lex', 'name' => 'Lazada Express'],
        ];
    }
}
