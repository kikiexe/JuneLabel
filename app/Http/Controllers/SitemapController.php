<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    /**
     * Generate and return the sitemap.xml
     */
    public function index(): Response
    {
        // Cache sitemap selama 6 jam agar tidak hit DB terlalu sering
        $xml = Cache::remember('sitemap.xml', 21600, function () {
            return $this->buildSitemap();
        });

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }

    private function buildSitemap(): string
    {
        $baseUrl = config('app.url');

        // Ambil semua produk aktif
        $products = Product::where('is_active', true)
            ->select('slug', 'updated_at')
            ->orderBy('updated_at', 'desc')
            ->get();

        // Ambil semua kategori
        $categories = Category::select('slug', 'updated_at')
            ->orderBy('name')
            ->get();

        // Static pages: [path, changefreq, priority, lastmod]
        $staticPages = [
            ['/',                      'weekly',  '1.0',  now()->toAtomString()],
            ['/collections',           'daily',   '0.9',  now()->toAtomString()],
            ['/collections/all',       'daily',   '0.9',  now()->toAtomString()],
            ['/collections/new-arrival','weekly', '0.8',  now()->toAtomString()],
            ['/collections/best-seller','weekly', '0.8',  now()->toAtomString()],
            ['/about-us',              'monthly', '0.5',  null],
            ['/contact-us',            'monthly', '0.5',  null],
            ['/our-store',             'monthly', '0.5',  null],
            ['/how-to-order',          'monthly', '0.4',  null],
            ['/how-to-pay',            'monthly', '0.4',  null],
            ['/shipping-policy',       'monthly', '0.4',  null],
            ['/privacy-policy',        'yearly',  '0.3',  null],
            ['/terms-conditions',      'yearly',  '0.3',  null],
            ['/payment-information',   'monthly', '0.4',  null],
            ['/track-order',           'monthly', '0.4',  null],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
        $xml .= '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";

        // --- Static Pages ---
        foreach ($staticPages as [$path, $changefreq, $priority, $lastmod]) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . e($baseUrl . $path) . "</loc>\n";
            if ($lastmod) {
                $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            }
            $xml .= "    <changefreq>{$changefreq}</changefreq>\n";
            $xml .= "    <priority>{$priority}</priority>\n";
            $xml .= "  </url>\n";
        }

        // --- Collection / Category Pages ---
        foreach ($categories as $category) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . e($baseUrl . '/collections/' . $category->slug) . "</loc>\n";
            if ($category->updated_at) {
                $xml .= "    <lastmod>" . $category->updated_at->toAtomString() . "</lastmod>\n";
            }
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        // --- Product Pages ---
        foreach ($products as $product) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . e($baseUrl . '/product/' . $product->slug) . "</loc>\n";
            if ($product->updated_at) {
                $xml .= "    <lastmod>" . $product->updated_at->toAtomString() . "</lastmod>\n";
            }
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return $xml;
    }
}
