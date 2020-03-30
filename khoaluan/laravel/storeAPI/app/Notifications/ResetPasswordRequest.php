<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordRequest extends Notification implements ShouldQueue
{
    use Queueable;
    protected $token;

    public function __construct($token)
    {
        $this->token = $token;
    }


    public function via($notifiable)
    {
        return ['mail'];
    }


    public function toMail($notifiable)
    {
        //$url = url('reset-password/'. $this->token);
        $url= 'http://localhost:4200/reset_password/'.$this->token;
        return (new MailMessage)
        ->line('Bạn nhận được email này vì chúng tôi đã nhận được yêu cầu khôi phục mật khẩu!')
        ->action('Phục hồi mật khẩu', $url)
        ->line('Nếu bạn không yêu cầu phục hồi mật khẩu, vui lòng bỏ qua email này');
    }


    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
