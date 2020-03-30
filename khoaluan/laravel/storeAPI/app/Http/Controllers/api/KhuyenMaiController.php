<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\KhuyenMai;
use App\ChiTietKhuyenMai;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Response;
use DB;

class KhuyenMaiController extends Controller
{
    public function index()
    {
        $items = KhuyenMai::all();
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
            $item=KhuyenMai::create($request->only('Ten','MoTa')+['NgayBD'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayBD),'NgayKT'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayKT)]);
            $data_find = KhuyenMai::find($item['id']);
            $result = array(
                'status' => 'OK',
                'message'=> 'Insert Successfully',
                'data'=> $data_find
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
        $data_find=KhuyenMai::find($id);
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
            $data_find=KhuyenMai::find($id);
            $data_find->update($request->only('Ten','MoTa')+['NgayBD'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayBD),'NgayKT'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayKT)]);
            $result = array(
                'status' => 'OK',
                'message'=> 'Update Successfully',
                'data'=> $data_find
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
            KhuyenMai::find($id)->delete();
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
        SELECT chi_tiet_khuyen_mais.*, san_pham_ban_muas."TenSanPham"
        FROM chi_tiet_khuyen_mais
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas."id" = chi_tiet_khuyen_mais."idSanPham"
        WHERE chi_tiet_khuyen_mais."idKhuyenMai" = '. $request['idKhuyenMai'];
        $data = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $data
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
}
