<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HoaDonNhap extends Model
{
	protected $guarded=[];
	public function user(){
		return $this->belongsTo('App\User','idUser','id');
	}
	public function chitiethoadonnhap(){
		return $this->hasMany('App\ChiTietHoaDonNhap','idHDN','id');
	}
	public function nhacungcap(){
		return $this->belongsTo('App\NhaCungCap','idNCC','id');
	}
}
