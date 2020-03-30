<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDonNhap extends Model
{
    protected $guarded=[];
    public function sanphambanmua(){
    	return $this->belongsTo('App\SanPhamBanMua','idSanPham','id');
    }
    public function hoadonnhap(){
    	return $this->belongsTo('App\HoaDonNhap','idHDN','id');
    }
}
