<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DanhGia extends Model
{
    protected $guarded=[];
    public function user(){
    	return $this->belongsTo('App\User','idUser','id');
    }
}
