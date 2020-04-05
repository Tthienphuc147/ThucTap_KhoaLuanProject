<?php
use App\KhuyenMai;
use Carbon\Carbon;
use App\DiaDiem;
use App\HoaDonNhap;
use App\ChiTietHoaDonNhap;
use App\ChiTietHoaDonXuat;
use App\HoaDonXuat;
use App\DanhGia;
use Illuminate\Support\Facades\Auth;
Class MYDIADIEM{
	public $thanhpho;
	public $quan;
	public $phuong;
	function __construct($tp,$q,$p)
	{
		$this->thanhpho = $tp;
		$this->quan = $q;
		$this->phuong = $p;
	}
}

function getSanPhamBanChay($db){
	$mang=[];
	$sanpham=$db
	->groupBy('idSanPham')
	->get();
	$mang=$sanpham->pluck('idSanPham');
	return $mang;
	
}

function getTongTienCart($cart){
	$tong=0 ;
	foreach($cart as $item)
	{
		if(getbanggia($item->id)==null)
		{

		}
		else{
			$tong=$tong+ getTiLe($item->id)*getbanggia($item->id)->GiaBan*$item->qty;
		}
	}
	return $tong;
}

function getSanPhamKhuyenMai(){
	$mang;
	if(getModelKhuyenMai()==null){
		return App\SanPhamBanMua::all();
	}
	else{
		$mang=getModelKhuyenMai()->chitietkhuyenmai->pluck('idSanPham');
		return App\SanPhamBanMua::whereIn('id',$mang)->get();
	}
	
}

function getTiLe($idsanpham){
	$sanpham=App\SanPhamBanMua::find($idsanpham);
	$now=Carbon::now();
	$khuyenmai=null;
	$khuyenmais=KhuyenMai::all();
	foreach($khuyenmais as $km){
		if($km->NgayBD<=$now && $km->NgayKT>=$now){
			$khuyenmai=$km;
		}
	}
	if($khuyenmai==null){
		return 1;
	}
	else{
		foreach($khuyenmai->chitietkhuyenmai as $item){
			if($item->idSanPham==$idsanpham){
				return (1-$item->TiLe);
			}

		}
		return 1;
	}

}

function getlohangdangban($idsanpham){
	return ChiTietHoaDonNhap::where('idSanPham',$idsanpham)->where('SoLuongTon','>',0)->first();
}

function getbanggia($idsanpham){
	$max_gia=0;
	$max_item=0;
	if(ChiTietHoaDonNhap::where('idSanPham',$idsanpham)->count()>0){
		foreach(ChiTietHoaDonNhap::where('idSanPham',$idsanpham)->get() as $item){
			if( $item->SoLuongTon>0 && $item->GiaBan>$max_gia){
				$max_gia=$item->GiaBan;
				$max_item=$item;
			}
		}
	}
	return $max_item;
}
function get_don_gia($table_import,$table_export,$idsanpham){
	$max_gia=0;
	$max_item=0;
	if(ChiTietHoaDonNhap::where('idSanPham',$idsanpham)->count()>0){
		foreach(ChiTietHoaDonNhap::where('idSanPham',$idsanpham)->get() as $item){
			$countExport=ChiTietHoaDonXuat::where([
				['idSanPham',$idsanpham],
				['MaDotNhap',$item->id]
			])->sum('SoLuong');
			if( $item->SoLuong>$countExport && $item->GiaBan>$max_gia){
				$max_gia=$item->GiaBan;
				$max_item=$item;
			}
		}
	}
	return $max_item->GiaBan;
}

function getSoLuongTon($idsanpham){
	return ChiTietHoaDonNhap::where('idSanPham',$idsanpham)->sum('SoLuongTon');
}

function getsoluongcart($idsanpham){
	
}

function getModelKhuyenMai(){
	$khuyenmais=KhuyenMai::all();
	$now=Carbon::now();
	foreach($khuyenmais as $km){
		if($km->NgayBD<=$now && $km->NgayKT>=$now){
			return $km;
		}
	}
	return null;
}

function getDiaDiem($id){
	if($id==null){
		return null;
	}
	$phuong=DiaDiem::find($id);
	$quan=DiaDiem::find($phuong->idParent);
	$thanhpho=DiaDiem::find($quan->idParent);
	$diadiem=new MYDIADIEM($thanhpho,$quan,$phuong);
	return $diadiem;

}

function getThanhPhos(){
	return DiaDiem::where('idParent',null)->get();
}

function getQuans(){
	$mangthanhpho=DiaDiem::where('idParent',null)->pluck('id')->unique();
	$quan=DiaDiem::whereIn('idParent',$mangthanhpho)->get();
	return $quan;
}

function getPhuongs(){
	$mangquan=getQuans()->pluck('id')->unique();
	return DiaDiem::whereIn('idParent',$mangquan)->get();;
}

function update_TongTien_HDN($idHDN){
	$hoadonnhap=HoaDonNhap::find($idHDN);
	$tongtien=0;
	foreach($hoadonnhap->chitiethoadonnhap as $item){
		$tongtien=$tongtien+$item->SoLuong*$item->GiaNhap;
	}
	try {
		$hoadonnhap->update(['TongTien'=>$tongtien]);
	} catch (Exception $e) {
		
	}
	return $tongtien;

}
function getsub_danhmuc($iddanhmuc){
	return App\DanhMuc::where('idParent',$iddanhmuc)->get();
}
function dequy($id){
	if(getsub_danhmuc($id)->count()>0){
		foreach(getsub_danhmuc($id) as $item){
			dequy($item->id);
		}
	}
	else{
		$GLOBALS["mang"][]=$id;
	}
}
function getallsub_danhmuc($iddanhmuc){
	$GLOBALS["mang"]=[];
	dequy($iddanhmuc);
	return $GLOBALS["mang"];
}
function array_dm_to_array($array){
	$mang1=[];
	foreach($array as $item){
		$mang=getallsub_danhmuc($item);
		foreach($mang as $item2){
			$mang1[]=$item2;
		}
	}
	return $mang1;
}
function get_nhasanxuat($iddanhmuc){
	$mang=App\SanPhamBanMua::where('idDanhMuc',$iddanhmuc)->pluck('idNSX')->unique();
	return App\NhaSanXuat::whereIn('id',$mang)->get();
}
function get_DiemTrungBinh($idsanpham){
	return DanhGia::where('idSanPham',$idsanpham)->average('Diem');
}
function get_CountDanhGia($idsanpham){
	return DanhGia::where('idSanPham',$idsanpham)->count();
}
function get_TiLeDanhGia($idsanpham,$diem){
	if(get_CountDanhGia($idsanpham)>0){
		$count=DanhGia::where('idSanPham',$idsanpham)->where('Diem',$diem)->count();
		return number_format(($count/get_CountDanhGia($idsanpham))*100,1);
	}
	return 0;
}
function is_dadanhgia($idsanpham){
	$user=Auth::user();
	return DanhGia::where('idSanPham',$idsanpham)->where('idUser',$user->id)->count();
}