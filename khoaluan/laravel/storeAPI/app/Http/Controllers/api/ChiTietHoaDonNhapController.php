<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ChiTietHoaDonNhap;
use Illuminate\Http\Response;
use DB;

class ChiTietHoaDonNhapController extends Controller
{
    public function index()
    {
        $query = '
        SELECT chi_tiet_hoa_don_nhaps.*
        ,   san_pham_ban_muas."TenSanPham"
        FROM chi_tiet_hoa_don_nhaps
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas."id" = chi_tiet_hoa_don_nhaps."idSanPham"
        ORDER BY chi_tiet_hoa_don_nhaps."id" ASC
        ';
        $items = DB::select($query);
        //
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $items
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function store(Request $request)
    {
        try {
            $item= ChiTietHoaDonNhap::create($request->only('SoLuong','GiaNhap','GiaBan','SoLuongTon','idHDN','idSanPham'));
            $query = '
            SELECT chi_tiet_hoa_don_nhaps.*
            ,   san_pham_ban_muas."TenSanPham"
            FROM chi_tiet_hoa_don_nhaps
            LEFT JOIN san_pham_ban_muas
            ON san_pham_ban_muas."id" = chi_tiet_hoa_don_nhaps."idSanPham"
            WHERE chi_tiet_hoa_don_nhaps."id" = '.$item['id'];
            $data_find = DB::select($query);
            //
            $result = array(
                'status' => 'OK',
                'message'=> 'Insert Successfully',
                'data'=> $data_find[0]
            );
            //
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
    //
    public function show($id)
    {
        $query = '
        SELECT chi_tiet_hoa_don_nhaps.*
        ,   san_pham_ban_muas."TenSanPham"
        FROM chi_tiet_hoa_don_nhaps
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas."id" = chi_tiet_hoa_don_nhaps."idSanPham"
        WHERE chi_tiet_hoa_don_nhaps."id" = '.$id;
        $data_find = DB::select($query);
            //
        $result = array(
            'status' => 'OK',
            'message'=> 'Refer Successfully',
            'data'=> $data_find[0]
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function update(Request $request, $id)
    {
        try {
            $item=ChiTietHoaDonNhap::find($id);
            $item->update($request->only('SoLuong','GiaNhap','GiaBan','SoLuongTon'));
            $query = '
            SELECT chi_tiet_hoa_don_nhaps.*
            ,   san_pham_ban_muas."TenSanPham"
            FROM chi_tiet_hoa_don_nhaps
            LEFT JOIN san_pham_ban_muas
            ON san_pham_ban_muas."id" = chi_tiet_hoa_don_nhaps."idSanPham"
            WHERE chi_tiet_hoa_don_nhaps."id" = '.$item['id'];
            $data_find = DB::select($query);
            //
            $result = array(
                'status' => 'OK',
                'message'=> 'Update Successfully',
                'data'=> $data_find[0]
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
    //
    public function destroy($id)
    {
        try {
            ChiTietHoaDonNhap::find($id)->delete();
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
    public function referDetail(Request $request){
        $query = '
        SELECT chi_tiet_hoa_don_nhaps.*
        ,   san_pham_ban_muas."TenSanPham"
        FROM chi_tiet_hoa_don_nhaps
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas."id" = chi_tiet_hoa_don_nhaps."idSanPham"
        INNER JOIN hoa_don_xuats
        ON hoa_don_xuats."id" = chi_tiet_hoa_don_nhaps."idHDN"
        AND hoa_don_xuats."id" = '.$request['idHDN'].'
        ORDER BY chi_tiet_hoa_don_nhaps."id" ASC
        ';
        $data_find = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $data_find
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
}
