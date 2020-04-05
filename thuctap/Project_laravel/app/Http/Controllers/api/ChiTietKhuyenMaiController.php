<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ChiTietKhuyenMai;
use DB;
use Illuminate\Http\Response;

class ChiTietKhuyenMaiController extends Controller
{
    public function index()
    {
        $query = '
        SELECT chi_tiet_khuyen_mais.*, san_pham_ban_muas."TenSanPham"
        FROM chi_tiet_khuyen_mais
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas."id" = chi_tiet_khuyen_mais."idSanPham"
        ';
        $data = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $data
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function store(Request $request)
    {
        try {
            if(ChiTietKhuyenMai::where('idKhuyenMai',$request->idKhuyenMai)->where('idSanPham',$request->idSanPham)->count()>0){
                $result = array(
                    'status' => 'ER',
                    'message'=> 'Duplicate idSanPham Error',
                    'data'=> ''
                );
                return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
            }
            //
            $item=ChiTietKhuyenMai::create($request->only('TiLe','idSanPham','idKhuyenMai'));
            $query = '
            SELECT chi_tiet_khuyen_mais.*, san_pham_ban_muas."TenSanPham"
            FROM chi_tiet_khuyen_mais
            LEFT JOIN san_pham_ban_muas
            ON san_pham_ban_muas."id" = chi_tiet_khuyen_mais."idSanPham"
            WHERE chi_tiet_khuyen_mais."id" = '. $item['id'];
            $data_find = DB::select($query);
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
        SELECT chi_tiet_khuyen_mais.*, san_pham_ban_muas."TenSanPham"
        FROM chi_tiet_khuyen_mais
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas."id" = chi_tiet_khuyen_mais."idSanPham"
        WHERE chi_tiet_khuyen_mais."id" = '.$id;
        $data_find = DB::select($query);
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
            $item=ChiTietKhuyenMai::find($id);
            $item->update($request->only('TiLe','idSanPham','idKhuyenMai'));
            $query = '
            SELECT chi_tiet_khuyen_mais.*, san_pham_ban_muas."TenSanPham"
            FROM chi_tiet_khuyen_mais
            LEFT JOIN san_pham_ban_muas
            ON san_pham_ban_muas."id" = chi_tiet_khuyen_mais."idSanPham"
            WHERE chi_tiet_khuyen_mais."id" = '.$item['id'];
            $data_find = DB::select($query);
            $result = array(
                'status' => 'OK',
                'message'=> 'Refer Successfully',
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
            ChiTietKhuyenMai::find($id)->delete();
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
