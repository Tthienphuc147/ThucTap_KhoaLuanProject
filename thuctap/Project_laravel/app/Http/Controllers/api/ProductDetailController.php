<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DanhMucHinh;
use App\DanhGia;
use App\ChiTietHoaDonXuat; 
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class ProductDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getImage(Request $request)
    {
        $data = DanhMucHinh::where('idSanPham',$request->id)->get();
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function checkBill(Request $request)
    {
        $data=DB::table('chi_tiet_hoa_don_xuats')
        ->leftJoin('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
        ->where('idUser',$request->idUser)
        ->where('idSanPham',$request->idSanPham)
        ->where('idTrangThai',4)
        ->count();
        $data2=DanhGia::where('idSanPham',$request->idSanPham)->where('idUser',$request->idUser)->count();
        $result = $data>0 && $data2==0 ? true:false; 
        return response()->json($result,200,[],JSON_NUMERIC_CHECK);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createRating(Request $request)
    { 
        if(DanhGia::where('idUser',$request->idUser)->where('idSanPham',$request->idSanPham)->count()== 0){
            try {
                $data=DanhGia::create($request->all());
                $query = '
                SELECT danh_gias.*,users."Ten",users."Hinh"
                FROM danh_gias
                LEFT JOIN users
                ON users."id" = danh_gias."idUser"
                WHERE danh_gias."id"='.$data['id'];
                $rating=DB::select($query);
                $result = array(
                    'status' => 'OK',
                    'message'=> 'Insert Successfully',
                    'data'=> $rating[0]
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
        $result = array(
            'status' => 'ER',
            'message'=> 'Rating Failed',
            'data'=> ''
        );
        return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteRating(Request $request)
    { 
        try {
            DanhGia::find($request->id)->delete();
        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json(['error'=>false],200,[],JSON_NUMERIC_CHECK);

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

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
        $query = '
        SELECT 
        san_pham_ban_muas.*,
        nha_san_xuats."Ten" as "TenNSX",
        MAX(temp."GiaBan") as price,
        temp2."rate",
        temp4."SoLuongTon"
        FROM 
        san_pham_ban_muas
        LEFT JOIN(
        SELECT 
        chi_tiet_hoa_don_nhaps."idSanPham", 
        chi_tiet_hoa_don_nhaps."GiaBan",
        chi_tiet_hoa_don_nhaps."SoLuong" as SoLuongNhap,
        SUM(chi_tiet_hoa_don_xuats."SoLuong") as "SoLuongXuat"
        FROM chi_tiet_hoa_don_nhaps
        LEFT JOIN chi_tiet_hoa_don_xuats 
        ON  chi_tiet_hoa_don_nhaps."id" = chi_tiet_hoa_don_xuats."MaDotNhap"
        WHERE chi_tiet_hoa_don_nhaps."idSanPham" ='.$id.'
        GROUP BY  chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham"
        HAVING (chi_tiet_hoa_don_nhaps."SoLuong" > SUM(chi_tiet_hoa_don_xuats."SoLuong") OR SUM(chi_tiet_hoa_don_xuats."SoLuong") IS NULL) 
        ) temp 
        ON 
        temp."idSanPham" = san_pham_ban_muas."id"
        LEFT JOIN (
        SELECT MAX(chi_tiet_khuyen_mais."TiLe") as rate, chi_tiet_khuyen_mais."idSanPham"
        FROM khuyen_mais
        LEFT JOIN chi_tiet_khuyen_mais
        ON chi_tiet_khuyen_mais."idKhuyenMai" = khuyen_mais."id"
        WHERE khuyen_mais."NgayBD" <= current_date 
        AND khuyen_mais."NgayKT" >= current_date
        GROUP BY chi_tiet_khuyen_mais."idSanPham"
        ) temp2
        ON 
        temp2."idSanPham" = san_pham_ban_muas."id"
        LEFT JOIN (
        SELECT san_pham_ban_muas."id",(SUM(COALESCE(temp3."SoLuongNhap",0)) - SUM(COALESCE(temp3."SoLuongXuat",0))) as "SoLuongTon"
        FROM san_pham_ban_muas
        LEFT JOIN (
        SELECT chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong" as "SoLuongNhap", SUM(tempExport."SoLuong") as "SoLuongXuat"
        FROM chi_tiet_hoa_don_nhaps


        -- LEFT JOIN chi_tiet_hoa_don_xuats
        --ON chi_tiet_hoa_don_xuats."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"

        LEFT JOIN (
        SELECT * FROM chi_tiet_hoa_don_xuats
        INNER JOIN hoa_don_xuats
        ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
        AND hoa_don_xuats."idTrangThai" <> 5
        ) tempExport
        ON tempExport."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"  



        GROUP BY chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham",chi_tiet_hoa_don_nhaps."SoLuong"
        ) temp3
        ON 
        temp3."idSanPham" = san_pham_ban_muas."id"
        GROUP BY 
        san_pham_ban_muas."id"
        ) temp4
        ON 
        temp4."id" = san_pham_ban_muas."id"
        LEFT JOIN nha_san_xuats
        ON 
        nha_san_xuats."id" = san_pham_ban_muas."idNSX"
        WHERE 
        san_pham_ban_muas."id"='.$id.'
        GROUP BY san_pham_ban_muas."id",temp2."rate", temp4."SoLuongTon", nha_san_xuats."Ten"
        ';
        //
        $query2='
        SELECT danh_gias.*,users."Ten",users."Hinh"
        FROM danh_gias
        LEFT JOIN users
        ON users."id" = danh_gias."idUser"
        WHERE danh_gias."idSanPham"='.$id.'
        ORDER BY danh_gias.created_at';
        
        try {
            $product= DB::select($query);
            $images = DanhMucHinh::where('idSanPham',$id)->get();
            $ratings = DB::select($query2);
        } catch (Exception $e) {
            return response()->json($e,500);
        }
        return response()->json(compact('product','images','ratings'),200,[],JSON_NUMERIC_CHECK);
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
