<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\HoaDonXuat;
use App\ChiTietHoaDonXuat;
use Illuminate\Http\Response;
use DB;
class HoaDonXuatController extends Controller
{
    public function index()
    {
        $query = "
        SELECT hoa_don_xuats.*  
        ,   users.\"Ten\" AS \"UserName\"
        ,   SUM(chi_tiet_hoa_don_xuats.\"SoLuong\" * chi_tiet_hoa_don_xuats.\"DonGia\") AS \"total\"
        ,  CONCAT(p.\"Ten\", ', ' ,q.\"Ten\",', ',tp.\"Ten\") AS \"DiaDiem\"
        FROM hoa_don_xuats
        LEFT JOIN users
        ON users.\"id\" = hoa_don_xuats.\"idUser\"
        LEFT JOIN chi_tiet_hoa_don_xuats
        ON chi_tiet_hoa_don_xuats.\"idHDX\" = hoa_don_xuats.\"id\"
        LEFT JOIN dia_diems p
        ON p.\"id\" = hoa_don_xuats.\"idDiaDiem\"
        LEFT JOIN dia_diems q 
        ON q.\"id\" = p.\"idParent\"
        LEFT JOIN dia_diems tp 
        ON tp.\"id\" = q.\"idParent\"
        GROUP BY hoa_don_xuats.\"id\"         
        ,   users.\"Ten\"
        ,   p.\"Ten\"
        ,   q.\"Ten\"
        ,   tp.\"Ten\" 
        ";
        $items = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $items
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function filterByIdTrangThai(Request $request)
    {
        $query = '
        SELECT hoa_don_xuats.*
        ,   users."Ten" AS "UserName"
        ,   SUM(chi_tiet_hoa_don_xuats."SoLuong" * chi_tiet_hoa_don_xuats."DonGia") AS "total"
        FROM hoa_don_xuats
        LEFT JOIN users
        ON users."id" = hoa_don_xuats."idUser"
        LEFT JOIN chi_tiet_hoa_don_xuats
        ON chi_tiet_hoa_don_xuats."idHDX" = hoa_don_xuats."id"
        GROUP BY hoa_don_xuats."id"
        ,   users."Ten"   
        HAVING hoa_don_xuats."idTrangThai" = '.$request['idTrangThai'];
        $items = DB::select($query);
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
            $hdx= HoaDonXuat::create($request->only('NguoiNhan','DiaChi','DienThoai','idUser','idDiaDiem','idTrangThai'));
        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        $dataReturn;
        foreach ($request->cart as $key => $value) {
            try {
                $dt= new ChiTietHoaDonXuat;
                $dt->idHDX=$hdx->id;
                $dt->SoLuong=$value['SoLuong'];
                $dt->DonGia=$value['DonGia'];
                $dt->MaDotNhap=$value['MaDotNhap'];
                $dt->idSanPham=$value['idSanPham'];
                $dt->save();
                $dataReturn[$key]=$dt;
            } catch (Exception $e) {
                return response()->json($e,200,[],JSON_NUMERIC_CHECK);
            }
        }
        return response()->json(compact('hdx','dataReturn'),200,[],JSON_NUMERIC_CHECK);
    }

    public function update(Request $request, $id)
    {
        try {
            $item=HoaDonXuat::find($id);
            $item->update($request->only('NguoiNhan','DiaChi','DienThoai','idTrangThai','idDiaDiem','LiDo'));
            $query = "
            SELECT hoa_don_xuats.*  
            ,   users.\"Ten\" AS \"UserName\"
            ,   SUM(chi_tiet_hoa_don_xuats.\"SoLuong\" * chi_tiet_hoa_don_xuats.\"DonGia\") AS \"total\"
            ,  CONCAT(p.\"Ten\", ', ' ,q.\"Ten\",', ',tp.\"Ten\") AS \"DiaDiem\"
            FROM hoa_don_xuats
            LEFT JOIN users
            ON users.\"id\" = hoa_don_xuats.\"idUser\"
            LEFT JOIN chi_tiet_hoa_don_xuats
            ON chi_tiet_hoa_don_xuats.\"idHDX\" = hoa_don_xuats.\"id\"
            LEFT JOIN dia_diems p
            ON p.\"id\" = hoa_don_xuats.\"idDiaDiem\"
            LEFT JOIN dia_diems q 
            ON q.\"id\" = p.\"idParent\"
            LEFT JOIN dia_diems tp 
            ON tp.\"id\" = q.\"idParent\"
            GROUP BY hoa_don_xuats.\"id\"         
            ,   users.\"Ten\"
            ,   p.\"Ten\"
            ,   q.\"Ten\"
            ,   tp.\"Ten\" 
            HAVING hoa_don_xuats.\"id\" =  $item[id]";
            $data_find = DB::select($query);
            $result = array(
                'status' => 'OK',
                'message'=> 'Fetch Successfully',
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
        $query1 = "
        SELECT hoa_don_xuats.*  
        ,   users.\"Ten\" AS \"UserName\"
        ,   SUM(chi_tiet_hoa_don_xuats.\"SoLuong\" * chi_tiet_hoa_don_xuats.\"DonGia\") AS \"total\"
        ,  CONCAT(p.\"Ten\", ', ' ,q.\"Ten\",', ',tp.\"Ten\") AS \"DiaDiem\"
        FROM hoa_don_xuats
        LEFT JOIN users
        ON users.\"id\" = hoa_don_xuats.\"idUser\"
        LEFT JOIN chi_tiet_hoa_don_xuats
        ON chi_tiet_hoa_don_xuats.\"idHDX\" = hoa_don_xuats.\"id\"
        LEFT JOIN dia_diems p
        ON p.\"id\" = hoa_don_xuats.\"idDiaDiem\"
        LEFT JOIN dia_diems q 
        ON q.\"id\" = p.\"idParent\"
        LEFT JOIN dia_diems tp 
        ON tp.\"id\" = q.\"idParent\"
        GROUP BY hoa_don_xuats.\"id\"         
        ,   users.\"Ten\"
        ,   p.\"Ten\"
        ,   q.\"Ten\"
        ,   tp.\"Ten\" 
        HAVING hoa_don_xuats.\"id\" =  $id";
        $data_find1 = DB::select($query1);
        //
        $query2 = "
        SELECT chi_tiet_hoa_don_xuats.*
        ,   san_pham_ban_muas.\"TenSanPham\"
        ,   san_pham_ban_muas.\"Hinh\"
        FROM chi_tiet_hoa_don_xuats
        LEFT JOIN san_pham_ban_muas
        ON san_pham_ban_muas.\"id\" = chi_tiet_hoa_don_xuats.\"idSanPham\"
        INNER JOIN hoa_don_xuats
        ON hoa_don_xuats.\"id\" = chi_tiet_hoa_don_xuats.\"idHDX\"
        AND hoa_don_xuats.\"id\" = $id
        ORDER BY chi_tiet_hoa_don_xuats.\"id\" ASC
        ";
        $data_find2 = DB::select($query2);
        //
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> ['hoadonxuat'=>$data_find1[0], 'detail'=>$data_find2]
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function destroy($id)
    {
        try {
            HoaDonXuat::find($id)->delete();
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
