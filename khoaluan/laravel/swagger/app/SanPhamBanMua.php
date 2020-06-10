<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SanPhamBanMua extends Model
{
	protected $guarded = [];
	public function nhasanxuat()
	{
		return $this->belongsTo('App\NhaSanXuat','idNSX','id');
	}
	public function danhmuc()
	{
		return $this->belongsTo('App\DanhMuc','idDanhMuc','id');
	}
	public function danhmuchinh()
	{
		return $this->hasMany('App\DanhMucHinh','idSanPham','id');
	}
	public function chitietkhuyenmai()
	{
		return $this->hasMany('App\ChiTietKhuyenMai','idSanPham','id');
	}
}
