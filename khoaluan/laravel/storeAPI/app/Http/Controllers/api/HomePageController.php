<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\SanPhamBanMua;
use App\ChiTietHoaDonNhap;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
class HomePageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = '
        SELECT 
        san_pham_ban_muas.*,
        nha_san_xuats."Ten" AS "TenNSX",
        danh_mucs."Ten" AS "TenDanhMuc",
        MAX(temp."GiaBan") as "price",
        temp2."rate",
        temp4."SoLuongTon"
        FROM san_pham_ban_muas
        LEFT JOIN(
            SELECT 
            chi_tiet_hoa_don_nhaps."idSanPham", 
            chi_tiet_hoa_don_nhaps."GiaBan",
            chi_tiet_hoa_don_nhaps."SoLuong" as SoLuongNhap,
            SUM(chi_tiet_hoa_don_xuats."SoLuong") as "SoLuongXuat"
            FROM chi_tiet_hoa_don_nhaps
            LEFT JOIN chi_tiet_hoa_don_xuats 
            ON  chi_tiet_hoa_don_nhaps."id" = chi_tiet_hoa_don_xuats."MaDotNhap"
            GROUP BY  chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham"
            HAVING (chi_tiet_hoa_don_nhaps."SoLuong" > SUM(chi_tiet_hoa_don_xuats."SoLuong") OR SUM(chi_tiet_hoa_don_xuats."SoLuong") IS NULL) 
            ORDER BY chi_tiet_hoa_don_nhaps."idSanPham"
        ) temp 
        ON temp."idSanPham" = san_pham_ban_muas."id"
        LEFT JOIN (
            SELECT MAX(chi_tiet_khuyen_mais."TiLe") as rate, chi_tiet_khuyen_mais."idSanPham"
            FROM khuyen_mais
            LEFT JOIN chi_tiet_khuyen_mais
            ON chi_tiet_khuyen_mais."idKhuyenMai" = khuyen_mais."id"
            WHERE khuyen_mais."NgayBD" <= current_date 
            AND khuyen_mais."NgayKT" >= current_date
            GROUP BY chi_tiet_khuyen_mais."idSanPham"
        ) temp2
        ON temp2."idSanPham" = san_pham_ban_muas."id"
        LEFT JOIN (
            SELECT san_pham_ban_muas."id",(SUM(COALESCE(temp3."SoLuongNhap",0)) - SUM(COALESCE(temp3."SoLuongXuat",0))) as "SoLuongTon"
            FROM san_pham_ban_muas
            LEFT JOIN (
                SELECT chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong" as "SoLuongNhap", SUM(tempExport."SoLuong") as "SoLuongXuat"
                FROM chi_tiet_hoa_don_nhaps


                -- LEFT JOIN chi_tiet_hoa_don_xuats
                -- ON chi_tiet_hoa_don_xuats."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
                -- INNER JOIN hoa_don_xuats 
                -- ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
                -- AND hoa_don_xuats."idTrangThai" <> 5
                
                LEFT JOIN (
                    SELECT * FROM chi_tiet_hoa_don_xuats
                    INNER JOIN hoa_don_xuats
                    ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
                    AND hoa_don_xuats."idTrangThai" <> 5
                ) tempExport
                ON tempExport."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"        
        
                ---
                GROUP BY chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong"
                ORDER BY chi_tiet_hoa_don_nhaps."idSanPham"
            ) temp3
            ON temp3."idSanPham" = san_pham_ban_muas."id"
            GROUP BY san_pham_ban_muas."id"
        ) temp4
        ON temp4."id" = san_pham_ban_muas."id"
        LEFT JOIN 
            nha_san_xuats
        ON  
            nha_san_xuats."id" = san_pham_ban_muas."idNSX"
        LEFT JOIN 
            danh_mucs
        ON  
            danh_mucs."id" = san_pham_ban_muas."idDanhMuc"
        GROUP BY san_pham_ban_muas."id",temp2."rate", temp4."SoLuongTon", danh_mucs."Ten", nha_san_xuats."Ten"
        ORDER BY san_pham_ban_muas."id"
        ';
        $data= DB::select($query);
        $collection = collect($data);
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
    }
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getHotSellProduct()
    {
        $query = '
        SELECT 
            san_pham_ban_muas."id",
            san_pham_ban_muas."TenSanPham",
            san_pham_ban_muas."Hinh",
            MAX(temp."GiaBan") as "price",
            temp2."rate",
            temp4."SoLuongTon",
            temp4."TotalExport"
        FROM 
            san_pham_ban_muas
        LEFT JOIN(
            SELECT 
                chi_tiet_hoa_don_nhaps."idSanPham", 
                chi_tiet_hoa_don_nhaps."GiaBan",
                chi_tiet_hoa_don_nhaps."SoLuong" as SoLuongNhap,
                SUM(chi_tiet_hoa_don_xuats."SoLuong") as "SoLuongXuat"
            FROM 
                chi_tiet_hoa_don_nhaps
            LEFT JOIN 
                chi_tiet_hoa_don_xuats 
            ON  
                chi_tiet_hoa_don_nhaps."id" = chi_tiet_hoa_don_xuats."MaDotNhap"
            GROUP BY  
                chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham"
            HAVING (
                chi_tiet_hoa_don_nhaps."SoLuong" > SUM(chi_tiet_hoa_don_xuats."SoLuong") OR SUM(chi_tiet_hoa_don_xuats."SoLuong") IS NULL
            ) 
            ORDER BY 
                chi_tiet_hoa_don_nhaps."idSanPham"
        ) temp 
        ON 
            temp."idSanPham" = san_pham_ban_muas."id"
        LEFT JOIN (
            SELECT 
                MAX(chi_tiet_khuyen_mais."TiLe") as rate, chi_tiet_khuyen_mais."idSanPham"
            FROM 
                khuyen_mais
            LEFT JOIN 
                chi_tiet_khuyen_mais
            ON 
                chi_tiet_khuyen_mais."idKhuyenMai" = khuyen_mais."id"
            WHERE 
                khuyen_mais."NgayBD" <= current_date 
            AND 
                khuyen_mais."NgayKT" >= current_date
            GROUP BY 
                chi_tiet_khuyen_mais."idSanPham"
        ) temp2
        ON 
            temp2."idSanPham" = san_pham_ban_muas."id"
        LEFT JOIN (
            SELECT 
                san_pham_ban_muas."id",
                (SUM(COALESCE(temp3."SoLuongNhap",0)) - SUM(COALESCE(temp3."SoLuongXuat",0))) as "SoLuongTon",
                SUM(COALESCE(temp3."SoLuongXuat",0)) as "TotalExport"
            FROM san_pham_ban_muas
            LEFT JOIN (
                SELECT chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong" as "SoLuongNhap", SUM(tempExport."SoLuong") as "SoLuongXuat"
                FROM chi_tiet_hoa_don_nhaps

                -- LEFT JOIN chi_tiet_hoa_don_xuats
                -- ON chi_tiet_hoa_don_xuats."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"
                LEFT JOIN (
                    SELECT * FROM chi_tiet_hoa_don_xuats
                    INNER JOIN hoa_don_xuats
                    ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
                    AND hoa_don_xuats."idTrangThai" <> 5
                ) tempExport
                ON tempExport."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"  
                --

                GROUP BY chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong"
                ORDER BY chi_tiet_hoa_don_nhaps."idSanPham"
            ) temp3
            ON temp3."idSanPham" = san_pham_ban_muas."id"
            GROUP BY san_pham_ban_muas."id"
        ) temp4
        ON 
            temp4."id" = san_pham_ban_muas."id"
        GROUP BY 
            san_pham_ban_muas."id",temp2."rate",
            temp4."SoLuongTon",
            temp4."TotalExport"
        ORDER BY 
            temp4."TotalExport" DESC
        LIMIT 10
        ';

        $data= DB::select($query);
        $collection = collect($data);
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
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
