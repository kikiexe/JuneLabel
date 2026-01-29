<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    /**
     * Subscribe email ke newsletter
     */
    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak valid.',
            ], 422);
        }

        // Cek apakah email sudah terdaftar
        $existing = NewsletterSubscriber::where('email', $request->email)->first();

        if ($existing) {
            if ($existing->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email sudah terdaftar di newsletter kami!',
                ], 409);
            } else {
                // Reaktivasi jika sebelumnya unsubscribe
                $existing->update([
                    'is_active' => true,
                    'subscribed_at' => now(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Terima kasih! Email Anda berhasil diaktifkan kembali.',
                ]);
            }
        }

        // Simpan subscriber baru
        NewsletterSubscriber::create([
            'email' => $request->email,
            'is_active' => true,
            'subscribed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih sudah subscribe! Kami akan kirim update terbaru ke email Anda.',
        ]);
    }
}
