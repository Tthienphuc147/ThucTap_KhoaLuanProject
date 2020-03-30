<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HoaDonXuat extends Model
{
    protected $guarded=[];
    public function trangthai(){
    	return $this->belongsTo('App\TrangThai','idTrangThai','id');
    }
    public function chitiethoadonxuat() {
    	return $this->hasMany('App\ChiTietHoaDonXuat','idHDX','id');
    }
}
