<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // biar support Coolify
        $middleware->trustProxies(at: '*');

        $middleware->web(append: [
            \App\Http\Middleware\SecurityHeaders::class, // <-- Global Security Headings
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->api(append: [
            \App\Http\Middleware\SecurityHeaders::class, // <-- Untuk API Endpoint juga
        ]);

        // Exclude Midtrans webhook & API forms from CSRF protection
        $middleware->validateCsrfTokens(except: [
            'midtrans/notification',
            'api/newsletter/subscribe',
            'api/contact/submit',
            'api/cart/*', // Exclude semua route cart
            'api/track-order',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
