<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Security Headers Utama (Standard Enterprise)
        $headers = [
            // Mencegah clickjacking (web kamu gak bisa dibuka di dalam <iframe> orang lain tanpa izin)
            'X-Frame-Options' => 'SAMEORIGIN',
            // Mencegah Sniffing MIME Type (hacker mengubah isi file gambar jadi text executable)
            'X-Content-Type-Options' => 'nosniff',
            // Perlindungan dasar terhadap XSS (hanya support browser lama, modern browser pakai CSP)
            'X-XSS-Protection' => '1; mode=block',
            // Menghapus Header Laravel default agar tidak bocor teknologinya (Laravel Version dsb)
            'X-Powered-By' => '',
            // Mencegah domain dirujuk (Referrer Policy) ke target asal (Privasi Pengguna)
            'Referrer-Policy' => 'strict-origin-when-cross-origin',
        ];

        foreach ($headers as $key => $value) {
            // Check if response has header property (mengantisipasi BinaryFileResponse, dll)
            if (method_exists($response, 'header')) {
                // If powered by is empty strings, we remove it
                if ($key === 'X-Powered-By' && empty($value)) {
                    $response->headers->remove('X-Powered-By');
                } else {
                    $response->header($key, $value);
                }
            }
        }

        return $response;
    }
}
