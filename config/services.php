<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'rajaongkir' => [
        'api_key' => env('RAJAONGKIR_API_KEY'),
        'origin_district_id' => env('RAJAONGKIR_ORIGIN_DISTRICT_ID', '1342'), // Default: Johor Baru
        'default_couriers' => 'jne:sicepat:jnt:anteraja:ninja:pos:tiki:lion',
        'max_cost_threshold' => 100000,
        'urls' => [
            'province' => env('BASE_URL_PROVINCE', 'https://rajaongkir.komerce.id/api/v1/destination/province'),
            'city' => env('BASE_URL_SEARCH_CITY', 'https://rajaongkir.komerce.id/api/v1/destination/city/{province_id}'),
            'district' => env('BASE_URL_SEARCH_DISTRICT', 'https://rajaongkir.komerce.id/api/v1/destination/district/{city_id}'),
            'subdistrict' => env('BASE_URL_SEARCH_SUBDISTRICT', 'https://rajaongkir.komerce.id/api/v1/destination/sub-district/{district_id}'),
            'cost_calculate' => env('BASE_URL_COST_CALCULATE_DISTRICT', 'https://rajaongkir.komerce.id/api/v1/calculate/district/domestic-cost'),
            'domestic_destination' => 'https://rajaongkir.komerce.id/api/v1/destination/domestic-destination',
        ],
    ],

];
