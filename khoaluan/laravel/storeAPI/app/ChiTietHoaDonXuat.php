<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDonXuat extends Model
{
	protected $guarded=[];
	public function sanpham()
	{
		return $this->belongsTo('App\SanPhamBanMua','idSanPham','id');
	}
}
