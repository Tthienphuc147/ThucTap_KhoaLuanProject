<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DanhGia;
use DB;
use Illuminate\Http\Response;
class DanhGiaController extends Controller
{
    public function index()
    {
        try {
            $query = '
            SELECT danh_gias."id"
            ,   danh_gias."Diem"
            ,   danh_gias."NoiDung"
            ,   danh_gias."idUser"
            ,   users."Ten" AS "TenUser"
            ,   san_pham_ban_muas."TenSanPham"
            FROM danh_gias
            LEFT JOIN users
            ON users."id" = danh_gias."idUser"
            LEFT JOIN san_pham_ban_muas
            ON san_pham_ban_muas."id" = danh_gias."idSanPham"
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
        if(DanhGia::where('idUser',$request->idUser)->where('idSanPham',$request->idSanPham)->count()==0){
            try {
                $data=DanhGia::create($request->all());
                $query = '
                SELECT danh_gias."id"
                ,   danh_gias."Diem"
                ,   danh_gias."NoiDung"
                ,   danh_gias."idUser"
                ,   users."Ten" AS "TenUser"
                ,   san_pham_ban_muas."TenSanPham"
                FROM danh_gias
                LEFT JOIN users
                ON users."id" = danh_gias."idUser"
                LEFT JOIN san_pham_ban_muas
                ON san_pham_ban_muas."id" = danh_gias."idSanPham"
                WHERE danh_gias."id" = '. $data['id'];
                $rating=DB::select($query);
                $result = array(
                    'status' => 'OK',
                    'message'=> 'Insert Successfully',
                    'data'=> $rating
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

    public function update(Request $request, $id)
    {
        $data=DanhGia::find($id);
        try {
            $data->update($request->only('Diem','NoiDung'));
        } catch (Exception $e) {
            return response()->json($e,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        }
        return response()->json($data,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }

    public function destroy($id)
    {
        try {
            DanhGia::find($id)->delete();
            $result = array(
                'status' => 'OK',
                'message'=> 'Deleted Successfully',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Deleted Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        }
    }
}
