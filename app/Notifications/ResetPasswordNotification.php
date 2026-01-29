<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordBase;
use Illuminate\Notifications\Messages\MailMessage;

/**
 * Custom password reset notification
 * Template: resources/views/emails/reset-password.blade.php
 */
class ResetPasswordNotification extends ResetPasswordBase
{
    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function toMail($notifiable)
    {
        $resetUrl = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));

        return (new MailMessage)
            ->subject('Reset Your Password - JuneLabel')
            ->view('emails.reset-password', [
                'resetUrl' => $resetUrl,
            ]);
    }
}
