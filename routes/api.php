<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Default Sanctum user route (for future API use if needed)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
