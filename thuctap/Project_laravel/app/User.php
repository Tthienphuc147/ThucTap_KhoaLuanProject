<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPasswordRequest;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements MustVerifyEmail, JWTSubject 
{
    use Notifiable;
    protected $guarded=[];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    //
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordRequest($token));
    }
    //
    public function quyen()
    {
        return $this->belongsTo('App\Quyen','idQuyen','id');
    }
    //
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    //
    public function getJWTCustomClaims()
    {
        return [];
    }
}
