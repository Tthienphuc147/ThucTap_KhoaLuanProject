<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChiTietKhuyenMai extends Model
{
	protected $guarded=[];
    public function sanphambanmua()
	{
		return $this->belongsTo('App\SanPhamBanMua','idSanPham','id');
	}
	public function khuyenmai()
	{
		return $this->belongsTo('App\KhuyenMai','idKhuyenMai','id');
	}
}
