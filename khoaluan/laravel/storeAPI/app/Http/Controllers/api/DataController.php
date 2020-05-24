<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\NhaSanXuat;
use App\NhaCungCap;
use App\ChiTietHoaDonNhap;
use App\ChiTietHoaDonXuat;
use App\ChiTietKhuyenMai;
use App\DanhGia;
use App\DanhMuc;
use App\DanhMucHinh;
use App\DiaDiem;
use App\HoaDonNhap;
use App\HoaDonXuat;
use App\KhuyenMai;
use App\Quyen;
use App\SanPhamBanMua;
use App\TrangThai;
use App\User;
use App\PasswordReset;
use App\DanhMucTinTuc;
use App\LoaiTinTuc;
use App\TinTuc;
use App\DanhMucDichVu;
use App\LoaiDichVu;
use App\DichVu;
class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $nhasanxuat=NhaSanXuat::all();
        $nhacungcap=NhaCungCap::all();
        $chitiethoadonnhap=ChiTietHoaDonNhap::all();
        $chitiethoadonxuat=ChiTietHoaDonXuat::all();
        $chitietkhuyenmai=ChiTietKhuyenMai::all();
        $danhgia=DanhGia::all();
        $danhmuc=DanhMuc::all();
        $danhmuchinh=DanhMucHinh::all();
        $diadiem=DiaDiem::all();
        $hoadonnhap=HoaDonNhap::all();
        $hoadonxuat=HoaDonXuat::all();
        $khuyenmai=KhuyenMai::all();
        $quyen=Quyen::all();
        $sanpham=SanPhamBanMua::orderBy('id','asc')->get();
        $trangthai=TrangThai::all();
        $user=User::all();
        $password_reset=PasswordReset::all();
        $danhmuctintuc=DanhMucTinTuc::all();
        $loaitintuc=LoaiTinTUc::all();
        $tintuc=TinTuc::all();
        $danhmucdichvu=DanhMucDichVu::all();
        $loaidichvu=LoaiDinhVu::all();
        $dichvu=DichVu::all();
        return response()->json(compact('nhasanxuat','nhacungcap','chitiethoadonnhap','chitiethoadonxuat','chitietkhuyenmai','danhgia','danhmuc','danhmuchinh','diadiem','hoadonnhap','hoadonxuat','khuyenmai','quyen','sanpham','trangthai','user','password_reset','danhmuctintuc','loaitintuc','tintuc','danhmucdichvu','loaidichvu','dichvu'),200,[],JSON_NUMERIC_CHECK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
