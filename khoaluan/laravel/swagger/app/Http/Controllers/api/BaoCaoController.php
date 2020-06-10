<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\HoaDonXuat;
use DB;
use DateTime;
use App\ChiTietHoaDonXuat;
use Illuminate\Http\Response;

class BaoCaoController extends Controller
{

    public function getDoanhThuTheoThang(Request $request){
        $date = (new DateTime($request->date));
        $query = '
        SELECT  SUM((chi_tiet_hoa_don_xuats."DonGia" - chi_tiet_hoa_don_nhaps."GiaNhap")*chi_tiet_hoa_don_xuats."SoLuong") as total
        FROM hoa_don_xuats
        LEFT JOIN chi_tiet_hoa_don_xuats
        ON chi_tiet_hoa_don_xuats."idHDX" = hoa_don_xuats."id"
        LEFT JOIN chi_tiet_hoa_don_nhaps
        ON chi_tiet_hoa_don_nhaps."id" = chi_tiet_hoa_don_xuats."MaDotNhap"
        WHERE EXTRACT(MONTH FROM hoa_don_xuats."updated_at") = '.$date->format("m").'
        AND EXTRACT(YEAR FROM hoa_don_xuats."updated_at") = '.$date->format("Y").'
        AND hoa_don_xuats."idTrangThai" = 4
        '
        ;
        $result= DB::select($query);
        return response()->json($result[0],Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    public function get_array_top(){

        $data=DB::table('chi_tiet_hoa_don_xuats')
        ->select('idSanPham',DB::raw('SUM("SoLuong") as "SoLuong"'))
        ->groupBy('idSanPham')
        ->orderBy('SoLuong','desc')->pluck('idSanPham');
        return response()->json($data,200);
    }
    public function baocao_donhang(Request $request){

        $ngaybd = (new DateTime($request->NgayBD))->format('m-d-Y');
        $ngaykt = (new DateTime($request->NgayKT))->format('m-d-Y');
        $query = "
        SELECT  hoa_don_xuats.*, users.\"Ten\" as \"UserName\",  trang_thais.\"Ten\" as \"StatusName\", SUM(chi_tiet_hoa_don_xuats.\"DonGia\"*chi_tiet_hoa_don_xuats.\"SoLuong\") as total
        FROM hoa_don_xuats
        LEFT JOIN chi_tiet_hoa_don_xuats
        ON chi_tiet_hoa_don_xuats.\"idHDX\" = hoa_don_xuats.\"id\"
        LEFT JOIN users
        ON users.\"id\" = hoa_don_xuats.\"idUser\"
        LEFT JOIN trang_thais
        ON trang_thais.\"id\" = hoa_don_xuats.\"idTrangThai\"
        GROUP BY hoa_don_xuats.\"id\", trang_thais.\"id\", users.\"id\"
        HAVING
        hoa_don_xuats.\"updated_at\" between '".$ngaybd."'::date AND '".$ngaykt."'::date
        AND hoa_don_xuats.\"idTrangThai\" = 4
        " ;
        $result= DB::select($query);
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    public function baocao_topsanpham(Request $request){
        if($request->NgayBD =='null' &&  $request->NgayKT=='null'){
            $sp=DB::table('san_pham_ban_muas')
            ->join('chi_tiet_hoa_don_xuats','chi_tiet_hoa_don_xuats.idSanPham','san_pham_ban_muas.id')
            ->join('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
            ->select('san_pham_ban_muas.id','san_pham_ban_muas.TenSanPham',DB::raw('SUM(chi_tiet_hoa_don_xuats."SoLuong") as "SoLuong"'))
            ->groupBy('san_pham_ban_muas.id','san_pham_ban_muas.TenSanPham')
            ->orderBy('SoLuong','desc')
            ->get();

            return $sp;
        }
        $ngaybd = Carbon::createFromFormat('d-m-Y',$request->NgayBD);
        $ngaykt = Carbon::createFromFormat('d-m-Y',$request->NgayKT);
        $sp=DB::table('san_pham_ban_muas')
        ->join('chi_tiet_hoa_don_xuats','chi_tiet_hoa_don_xuats.idSanPham','san_pham_ban_muas.id')
        ->join('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
        ->where('hoa_don_xuats.created_at','>',$ngaybd)
        ->where('hoa_don_xuats.created_at','<',$ngaykt)
        ->select('san_pham_ban_muas.id','san_pham_ban_muas.TenSanPham',DB::raw('SUM(chi_tiet_hoa_don_xuats."SoLuong") as "SoLuong"'))
        ->groupBy('san_pham_ban_muas.id','san_pham_ban_muas.TenSanPham')
        ->orderBy('SoLuong','desc')
        ->get();

        return $sp;
    }
    public function baocao_luotmua(Request $request){
        if($request->NgayBD =='null' &&  $request->NgayKT=='null'){
            $sp= DB::table('chi_tiet_hoa_don_xuats')
            ->leftJoin('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
            ->leftJoin('users','users.id','hoa_don_xuats.idUser')
            ->where('idUser','!=',null)
            ->select('hoa_don_xuats.idUser','users.Ten',DB::raw('COUNT(hoa_don_xuats.id) as "SoLuotMua"'),DB::raw('SUM("SoLuong"*"DonGia") as "ThanhTien"'))
            ->groupBy('hoa_don_xuats.idUser','users.Ten')
            ->orderBy('SoLuotMua','desc')
            ->get();
            return $sp;
        }
        $ngaybd = Carbon::createFromFormat('d-m-Y',$request->NgayBD);
        $ngaykt = Carbon::createFromFormat('d-m-Y',$request->NgayKT);
        $sp= DB::table('chi_tiet_hoa_don_xuats')->leftJoin('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
        ->leftJoin('users','users.id','hoa_don_xuats.idUser')
        ->where('idUser','!=',null)
        ->where('hoa_don_xuats.created_at','>',$ngaybd)
        ->where('hoa_don_xuats.created_at','<',$ngaykt)
        ->select('hoa_don_xuats.idUser','users.Ten',DB::raw('COUNT(hoa_don_xuats.id) as "SoLuotMua"'),DB::raw('SUM("SoLuong"*"DonGia") as "ThanhTien"'))
        ->groupBy('hoa_don_xuats.idUser','users.Ten')
        ->orderBy('SoLuotMua','desc')
        ->get();
        return $sp;
    }
    public function baocao_giatridonhang(Request $request){
        if($request->NgayBD =='null' &&  $request->NgayKT=='null'){
            $sp= DB::table('chi_tiet_hoa_don_xuats')
            ->leftJoin('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
            ->leftJoin('users','users.id','hoa_don_xuats.idUser')
            ->where('idUser','!=',null)
            ->select('hoa_don_xuats.idUser','users.Ten',DB::raw("COUNT(hoa_don_xuats.id) as SoLuotMua"),DB::raw("SUM(SoLuong*DonGia) as ThanhTien"))
            ->groupBy('hoa_don_xuats.idUser','users.Ten')
            ->orderBy('ThanhTien','desc')->get();
            return $sp;
        }
        $ngaybd = Carbon::createFromFormat('d-m-Y',$request->NgayBD);
        $ngaykt = Carbon::createFromFormat('d-m-Y',$request->NgayKT);
        $sp= DB::table('chi_tiet_hoa_don_xuats')->leftJoin('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
        ->leftJoin('users','users.id','hoa_don_xuats.idUser')
        ->where('idUser','!=',null)
        ->where('hoa_don_xuats.created_at','>',$ngaybd)
        ->where('hoa_don_xuats.created_at','<',$ngaykt)
        ->select('hoa_don_xuats.idUser','users.Ten',DB::raw("COUNT(hoa_don_xuats.id) as SoLuotMua"),DB::raw("SUM(SoLuong*DonGia) as ThanhTien"))
        ->groupBy('hoa_don_xuats.idUser','users.Ten')
        ->orderBy('ThanhTien','desc')
        ->get();
        return $sp;
    }

}
