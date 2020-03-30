<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\HoaDonNhap;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Response;
use DB;

class HoaDonNhapController extends Controller
{
    public function index()
    {
        $query = '
        SELECT hoa_don_nhaps.*
        ,   users."Ten" AS "UserName"
        ,   nha_cung_caps."Ten" AS "NCCName"
        ,   SUM(chi_tiet_hoa_don_nhaps."SoLuong" * chi_tiet_hoa_don_nhaps."GiaNhap") AS "total"
        FROM hoa_don_nhaps
        LEFT JOIN users
        ON users."id" = hoa_don_nhaps."idUser"
        LEFT JOIN nha_cung_caps
        ON nha_cung_caps."id" = hoa_don_nhaps."idNCC"
        LEFT JOIN chi_tiet_hoa_don_nhaps
        ON chi_tiet_hoa_don_nhaps."idHDN" = hoa_don_nhaps."id"
        GROUP BY hoa_don_nhaps."id"
        ,   users."Ten"
        ,   nha_cung_caps."Ten"
        ORDER BY hoa_don_nhaps."id" ASC
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
            $date=Carbon::createFromFormat('d-m-Y', $request->NgayNhap);
            $item= HoaDonNhap::create($request->only('idUser','idNCC')+['NgayNhap'=>$date]);
            //
            $query = '
            SELECT hoa_don_nhaps.*
            ,   users."Ten" AS "UserName"
            ,   nha_cung_caps."Ten" AS "NCCName"
            ,   SUM(chi_tiet_hoa_don_nhaps."SoLuong" * chi_tiet_hoa_don_nhaps."GiaNhap") AS "total"
            FROM hoa_don_nhaps
            LEFT JOIN users
            ON users."id" = hoa_don_nhaps."idUser"
            LEFT JOIN nha_cung_caps
            ON nha_cung_caps."id" = hoa_don_nhaps."idNCC"
            LEFT JOIN chi_tiet_hoa_don_nhaps
            ON chi_tiet_hoa_don_nhaps."idHDN" = hoa_don_nhaps."id"
            GROUP BY hoa_don_nhaps."id"
            ,   users."Ten"
            ,   nha_cung_caps."Ten"
            HAVING hoa_don_nhaps."id" = '.$item['id'];
            $data_find = DB::select($query);
            //
            $result = array(
                'status' => 'OK',
                'message'=> 'Insert Successfully',
                'data'=> $data_find[0]
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
    //
    public function show($id)
    {
        $query = '
        SELECT hoa_don_nhaps.*
        ,   users."Ten" AS "UserName"
        ,   nha_cung_caps."Ten" AS "NCCName"
        ,   SUM(chi_tiet_hoa_don_nhaps."SoLuong" * chi_tiet_hoa_don_nhaps."GiaNhap") AS "total"
        FROM hoa_don_nhaps
        LEFT JOIN users
        ON users."id" = hoa_don_nhaps."idUser"
        LEFT JOIN nha_cung_caps
        ON nha_cung_caps."id" = hoa_don_nhaps."idNCC"
        LEFT JOIN chi_tiet_hoa_don_nhaps
        ON chi_tiet_hoa_don_nhaps."idHDN" = hoa_don_nhaps."id"
        GROUP BY hoa_don_nhaps."id"
        ,   users."Ten"
        ,   nha_cung_caps."Ten"
        HAVING hoa_don_nhaps."id" = '.$id;
        $data_find = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Refer Successfully',
            'data'=> $data_find
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function update(Request $request, $id)
    {
        try {
            $item=HoaDonNhap::find($id);
            $item->update($request->only('idUser','NgayNhap','idNCC'));
            //
            $query = '
            SELECT hoa_don_nhaps.*
            ,   users."Ten" AS "UserName"
            ,   nha_cung_caps."Ten" AS "NCCName"
            ,   SUM(chi_tiet_hoa_don_nhaps."SoLuong" * chi_tiet_hoa_don_nhaps."GiaNhap") AS "total"
            FROM hoa_don_nhaps
            LEFT JOIN users
            ON users."id" = hoa_don_nhaps."idUser"
            LEFT JOIN nha_cung_caps
            ON nha_cung_caps."id" = hoa_don_nhaps."idNCC"
            LEFT JOIN chi_tiet_hoa_don_nhaps
            ON chi_tiet_hoa_don_nhaps."idHDN" = hoa_don_nhaps."id"
            GROUP BY hoa_don_nhaps."id"
            ,   users."Ten"
            ,   nha_cung_caps."Ten"
            HAVING hoa_don_nhaps."id" = '.$item['id'];
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
            HoaDonNhap::find($id)->delete();
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
