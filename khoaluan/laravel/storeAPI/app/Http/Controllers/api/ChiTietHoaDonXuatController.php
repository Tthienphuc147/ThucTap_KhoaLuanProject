<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ChiTietHoaDonXuat;
use DB;
use Illuminate\Http\Response;

class ChiTietHoaDonXuatController extends Controller
{
    public function index()
    {
        $items=ChiTietHoaDonXuat::all();
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $items
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }

    public function store(Request $request)
    {
        try {
            $data= ChiTietHoaDonXuat::create($request->all());
        } catch (Exception $e) {
            return response()->json($e,200);
        }
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
    }

    public function update(Request $request, $id)
    {
        $data=ChiTietHoaDonXuat::find($id);
        try {
            $data->update($request->only('NguoiNhan','DiaChi','DienThoai','idTrangThai','idDiaDiem','LyDo'));
        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
    }

    public function destroy($id)
    {
        try {
            ChiTietHoaDonXuat::find($id)->delete();
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
        $query = "
        SELECT chi_tiet_hoa_don_xuats.*
        ,   san_pham_ban_muas.\"TenSanPham\"
        ,   san_pham_ban_muas.\"Hinh\"
        FROM chi_tiet_hoa_don_xuats
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas.\"id\" = chi_tiet_hoa_don_xuats.\"idSanPham\"
        INNER JOIN hoa_don_xuats
        ON hoa_don_xuats.\"id\" = chi_tiet_hoa_don_xuats.\"idHDX\"
        AND hoa_don_xuats.\"id\" = $request[idHDX]
        ORDER BY chi_tiet_hoa_don_xuats.\"id\" ASC
        ";
        $data_find = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $data_find
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
}
