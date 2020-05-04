<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\SanPhamBanMua;
use File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use DB;
use Illuminate\Http\Response;

class SanPhamController extends Controller
{
    public function index()
    {
        try {
            $query = '
            SELECT
            san_pham_ban_muas.*
            ,   danh_mucs."Ten" AS "TenDanhMuc"
            ,   nha_san_xuats."Ten" AS "TenNSX"
            ,   MAX(temp_Price."GiaBan") as "price"
            ,   temp_Rate."rate"
            ,   temp_Count."SoLuongTon"
            ,   temp_Count."TotalExport"
            FROM san_pham_ban_muas
            LEFT JOIN(
            SELECT
            chi_tiet_hoa_don_nhaps."idSanPham"
            ,   chi_tiet_hoa_don_nhaps."GiaBan"
            FROM   chi_tiet_hoa_don_nhaps
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_xuats."SoLuong"
            ,   chi_tiet_hoa_don_xuats."MaDotNhap"
            FROM chi_tiet_hoa_don_xuats
            INNER JOIN hoa_don_xuats
            ON  hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
            AND hoa_don_xuats."idTrangThai" <> 5
            ) temp_CTHDX
            ON temp_CTHDX."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
            GROUP BY  chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham"
            HAVING (
            chi_tiet_hoa_don_nhaps."SoLuong" > SUM(temp_CTHDX."SoLuong")
            OR
            SUM(temp_CTHDX."SoLuong") IS NULL
            )
            ) temp_Price
            ON temp_Price."idSanPham" = san_pham_ban_muas."id"
            LEFT JOIN (
            SELECT
            MAX(chi_tiet_khuyen_mais."TiLe") as "rate"
            ,   chi_tiet_khuyen_mais."idSanPham"
            FROM khuyen_mais
            LEFT JOIN chi_tiet_khuyen_mais
            ON chi_tiet_khuyen_mais."idKhuyenMai" = khuyen_mais."id"
            WHERE
            khuyen_mais."NgayBD" <= current_date
            AND khuyen_mais."NgayKT" >= current_date
            GROUP BY chi_tiet_khuyen_mais."idSanPham"
            ) temp_Rate
            ON temp_Rate."idSanPham" = san_pham_ban_muas."id"
            LEFT JOIN (
            SELECT
            san_pham_ban_muas."id"
            ,   (SUM(COALESCE(temp_CTHDN."SoLuongNhap",0)) - SUM(COALESCE(temp_CTHDN."SoLuongXuat",0))) as "SoLuongTon"
            ,   SUM(COALESCE(temp_CTHDN."SoLuongXuat",0)) as "TotalExport"
            FROM san_pham_ban_muas
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_nhaps."idSanPham"
            ,   chi_tiet_hoa_don_nhaps."SoLuong" as "SoLuongNhap"
            ,   SUM(tempExport."SoLuong") as "SoLuongXuat"
            FROM chi_tiet_hoa_don_nhaps
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_xuats."MaDotNhap"
            ,   chi_tiet_hoa_don_xuats."SoLuong"
            FROM chi_tiet_hoa_don_xuats
            INNER JOIN hoa_don_xuats
            ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
            AND hoa_don_xuats."idTrangThai" <> 5
            ) tempExport
            ON tempExport."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
            GROUP BY chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong"
            ) temp_CTHDN
            ON temp_CTHDN."idSanPham" = san_pham_ban_muas."id"
            GROUP BY san_pham_ban_muas."id"
            ) temp_Count
            ON
            temp_Count."id" = san_pham_ban_muas."id"
            LEFT JOIN danh_mucs
            ON danh_mucs."id" = san_pham_ban_muas."idDanhMuc"
            LEFT JOIN nha_san_xuats
            ON nha_san_xuats."id" = san_pham_ban_muas."idNSX"
            GROUP BY
            san_pham_ban_muas."id",temp_Rate."rate"
            ,   temp_Count."SoLuongTon"
            ,   temp_Count."TotalExport"
            ,   danh_mucs."Ten"
            ,   nha_san_xuats."Ten"
            ORDER BY san_pham_ban_muas."id" ASC
            ';
            $data=DB::select($query);
            $result = array(
                'status' => 'OK',
                'message'=> 'Fetch Successfully',
                'data'=> $data
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Fetch Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
    }

    public function store(Request $request)
    {

        try {
            $sanpham;
            $name="";
            if($request->hasFile('Hinh'))
            {
                $file=$request->file('Hinh');
                $duoi=$file->getClientOriginalExtension();
                if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg' && $duoi != 'webp')
                {
                    return  response()->json(['content'=>'File khong dung dinh dang',"error"=>true],200);
                }
                $disk = Storage::disk('gcs');
                $path=$disk->put('sanpham', $file);
                $name=Str::after($path, 'sanpham/');
            }
            $sanpham=SanPhamBanMua::create($request->only('idDanhMuc','idNSX','TenSanPham','MoTa','ThongTin')+['Hinh'=>$name]);
            $query = '
            SELECT
            san_pham_ban_muas.*
            ,   danh_mucs."Ten" AS "TenDanhMuc"
            ,   nha_san_xuats."Ten" AS "TenNSX"
            ,   MAX(temp_Price."GiaBan") as "price"
            ,   temp_Rate."rate"
            ,   temp_Count."SoLuongTon"
            ,   temp_Count."TotalExport"
            FROM san_pham_ban_muas
            LEFT JOIN(
            SELECT
            chi_tiet_hoa_don_nhaps."idSanPham"
            ,   chi_tiet_hoa_don_nhaps."GiaBan"
            FROM   chi_tiet_hoa_don_nhaps
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_xuats."SoLuong"
            ,   chi_tiet_hoa_don_xuats."MaDotNhap"
            FROM chi_tiet_hoa_don_xuats
            INNER JOIN hoa_don_xuats
            ON  hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
            AND hoa_don_xuats."idTrangThai" <> 5
            ) temp_CTHDX
            ON temp_CTHDX."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
            GROUP BY  chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham"
            HAVING (
            chi_tiet_hoa_don_nhaps."SoLuong" > SUM(temp_CTHDX."SoLuong")
            OR
            SUM(temp_CTHDX."SoLuong") IS NULL
            )
            ) temp_Price
            ON temp_Price."idSanPham" = san_pham_ban_muas."id"
            LEFT JOIN (
            SELECT
            MAX(chi_tiet_khuyen_mais."TiLe") as "rate"
            ,   chi_tiet_khuyen_mais."idSanPham"
            FROM khuyen_mais
            LEFT JOIN chi_tiet_khuyen_mais
            ON chi_tiet_khuyen_mais."idKhuyenMai" = khuyen_mais."id"
            WHERE
            khuyen_mais."NgayBD" <= current_date
            AND khuyen_mais."NgayKT" >= current_date
            GROUP BY chi_tiet_khuyen_mais."idSanPham"
            ) temp_Rate
            ON temp_Rate."idSanPham" = san_pham_ban_muas."id"
            LEFT JOIN (
            SELECT
            san_pham_ban_muas."id"
            ,   (SUM(COALESCE(temp_CTHDN."SoLuongNhap",0)) - SUM(COALESCE(temp_CTHDN."SoLuongXuat",0))) as "SoLuongTon"
            ,   SUM(COALESCE(temp_CTHDN."SoLuongXuat",0)) as "TotalExport"
            FROM san_pham_ban_muas
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_nhaps."idSanPham"
            ,   chi_tiet_hoa_don_nhaps."SoLuong" as "SoLuongNhap"
            ,   SUM(tempExport."SoLuong") as "SoLuongXuat"
            FROM chi_tiet_hoa_don_nhaps
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_xuats."MaDotNhap"
            ,   chi_tiet_hoa_don_xuats."SoLuong"
            FROM chi_tiet_hoa_don_xuats
            INNER JOIN hoa_don_xuats
            ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
            AND hoa_don_xuats."idTrangThai" <> 5
            ) tempExport
            ON tempExport."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
            GROUP BY chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong"
            ) temp_CTHDN
            ON temp_CTHDN."idSanPham" = san_pham_ban_muas."id"
            GROUP BY san_pham_ban_muas."id"
            ) temp_Count
            ON
            temp_Count."id" = san_pham_ban_muas."id"
            LEFT JOIN danh_mucs
            ON danh_mucs."id" = san_pham_ban_muas."idDanhMuc"
            LEFT JOIN nha_san_xuats
            ON nha_san_xuats."id" = san_pham_ban_muas."idNSX"
            GROUP BY
            san_pham_ban_muas."id",temp_Rate."rate"
            ,   temp_Count."SoLuongTon"
            ,   temp_Count."TotalExport"
            ,   danh_mucs."Ten"
            ,   nha_san_xuats."Ten"
            HAVING san_pham_ban_muas."id" ='.$sanpham['id'];
            $data=DB::select($query);
            $result = array(
                'status' => 'OK',
                'message'=> 'Insert Successfully',
                'data'=> $data[0]
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Insert Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
    }
    public function update($id ,Request $request)
    {

        try {
            $sanpham=SanPhamBanMua::find($id);
            if(SanPhamBanMua::where('TenSanPham',$request->TenSanPham)->where('id','!=',$sanpham->id)->count()>0){
                return response()->json(["error"=>true],200);
            }
            $Hinh;
            $oldname=$sanpham->Hinh;
            if($request->hasFile('Hinh'))
            {
                $file=$request->file('Hinh');
                $duoi=$file->getClientOriginalExtension();
                if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg')
                {
                    return response()->json("loi dinh dang");
                }
                $disk = Storage::disk('gcs');
                $path=$disk->put('sanpham', $file);
                $disk->delete('sanpham/'.$oldname);
                $name=Str::after($path, 'sanpham/');
                if($path){
                    $sanpham->update($request->only('idDanhMuc','idNSX','TenSanPham','MoTa','ThongTin')+['Hinh'=>$name]);
                }
            }
            else{
                $sanpham->update($request->all());
            }
            $query = '
            SELECT
            san_pham_ban_muas.*
            ,   danh_mucs."Ten" AS "TenDanhMuc"
            ,   nha_san_xuats."Ten" AS "TenNSX"
            ,   MAX(temp_Price."GiaBan") as "price"
            ,   temp_Rate."rate"
            ,   temp_Count."SoLuongTon"
            ,   temp_Count."TotalExport"
            FROM san_pham_ban_muas
            LEFT JOIN(
            SELECT
            chi_tiet_hoa_don_nhaps."idSanPham"
            ,   chi_tiet_hoa_don_nhaps."GiaBan"
            FROM   chi_tiet_hoa_don_nhaps
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_xuats."SoLuong"
            ,   chi_tiet_hoa_don_xuats."MaDotNhap"
            FROM chi_tiet_hoa_don_xuats
            INNER JOIN hoa_don_xuats
            ON  hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
            AND hoa_don_xuats."idTrangThai" <> 5
            ) temp_CTHDX
            ON temp_CTHDX."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
            GROUP BY  chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham"
            HAVING (
            chi_tiet_hoa_don_nhaps."SoLuong" > SUM(temp_CTHDX."SoLuong")
            OR
            SUM(temp_CTHDX."SoLuong") IS NULL
            )
            ) temp_Price
            ON temp_Price."idSanPham" = san_pham_ban_muas."id"
            LEFT JOIN (
            SELECT
            MAX(chi_tiet_khuyen_mais."TiLe") as "rate"
            ,   chi_tiet_khuyen_mais."idSanPham"
            FROM khuyen_mais
            LEFT JOIN chi_tiet_khuyen_mais
            ON chi_tiet_khuyen_mais."idKhuyenMai" = khuyen_mais."id"
            WHERE
            khuyen_mais."NgayBD" <= current_date
            AND khuyen_mais."NgayKT" >= current_date
            GROUP BY chi_tiet_khuyen_mais."idSanPham"
            ) temp_Rate
            ON temp_Rate."idSanPham" = san_pham_ban_muas."id"
            LEFT JOIN (
            SELECT
            san_pham_ban_muas."id"
            ,   (SUM(COALESCE(temp_CTHDN."SoLuongNhap",0)) - SUM(COALESCE(temp_CTHDN."SoLuongXuat",0))) as "SoLuongTon"
            ,   SUM(COALESCE(temp_CTHDN."SoLuongXuat",0)) as "TotalExport"
            FROM san_pham_ban_muas
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_nhaps."idSanPham"
            ,   chi_tiet_hoa_don_nhaps."SoLuong" as "SoLuongNhap"
            ,   SUM(tempExport."SoLuong") as "SoLuongXuat"
            FROM chi_tiet_hoa_don_nhaps
            LEFT JOIN (
            SELECT
            chi_tiet_hoa_don_xuats."MaDotNhap"
            ,   chi_tiet_hoa_don_xuats."SoLuong"
            FROM chi_tiet_hoa_don_xuats
            INNER JOIN hoa_don_xuats
            ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
            AND hoa_don_xuats."idTrangThai" <> 5
            ) tempExport
            ON tempExport."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
            GROUP BY chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong"
            ) temp_CTHDN
            ON temp_CTHDN."idSanPham" = san_pham_ban_muas."id"
            GROUP BY san_pham_ban_muas."id"
            ) temp_Count
            ON
            temp_Count."id" = san_pham_ban_muas."id"
            LEFT JOIN danh_mucs
            ON danh_mucs."id" = san_pham_ban_muas."idDanhMuc"
            LEFT JOIN nha_san_xuats
            ON nha_san_xuats."id" = san_pham_ban_muas."idNSX"
            GROUP BY
            san_pham_ban_muas."id",temp_Rate."rate"
            ,   temp_Count."SoLuongTon"
            ,   temp_Count."TotalExport"
            ,   danh_mucs."Ten"
            ,   nha_san_xuats."Ten"
            HAVING san_pham_ban_muas."id" ='.$sanpham['id'];
            $data=DB::select($query);
            $result = array(
                'status' => 'OK',
                'message'=> 'Update Successfully',
                'data'=> $data[0]
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Update Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }

    }

    public function destroy($id)
    {
        try {
            $sp=SanPhamBanMua::find($id);
            $oldname=$sp->Hinh;
            $sp->delete();
            $disk = Storage::disk('gcs');
            $disk->delete('sanpham/'.$oldname);
            $result = array(
                'status' => 'OK',
                'message'=> 'Delete Successfully',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Delete Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
    }
}
