<?php

namespace App\Http\Controllers;

use App\Models\ContactInquiry;
use App\Mail\NewContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * Submit contact form inquiry
     */
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Mohon lengkapi semua field yang wajib diisi.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Simpan inquiry ke database
            $inquiry = ContactInquiry::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'message' => $request->message,
                'status' => 'new',
            ]);

            // Kirim email ke admin (gunakan email dari .env)
            $adminEmail = config('mail.from.address');

            try {
                Mail::to($adminEmail)->send(new NewContactInquiry($inquiry));
                Log::info('Contact inquiry email sent', ['inquiry_id' => $inquiry->id]);
            } catch (\Exception $e) {
                // Log error tapi tetap return success (inquiry sudah tersimpan)
                Log::error('Failed to send contact inquiry email: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Terima kasih! Pesan Anda sudah kami terima. Kami akan segera menghubungi Anda.',
            ]);
        } catch (\Exception $e) {
            Log::error('Contact form submission error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.',
            ], 500);
        }
    }
}
