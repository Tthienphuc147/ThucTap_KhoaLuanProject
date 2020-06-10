<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KhuyenMai extends Model
{
	protected $guarded=[];
    public function chitietkhuyenmai()
	{
		return $this->hasMany('App\ChiTietKhuyenMai','idKhuyenMai','id');
	}
}
