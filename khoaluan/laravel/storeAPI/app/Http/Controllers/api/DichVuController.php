<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DichVu;
use DB;
use Illuminate\Http\Response;
class DichVuController extends Controller
{
    public function getDichVu($id_dich_vu){
        $dich_vu = DB::table('dich_vus')->where('dich_vus.id','=',$id_dich_vu)
        ->join('loai_dich_vus','loai_dich_vus.id','dich_vus.id_loai_dich_vu')
        ->select('dich_vus.*','loai_dich_vus.ten as ten_loai_dich_vu')
        ->first();
		$admin = DB::table('users')->where('id','=',$dich_vu->id_admin)->first();
		try {
            $data = (object) ['DichVu' => $dich_vu,'admin' => $admin];
            $result = array(
                'status' => 'OK',
                'message'=> 'Fetch Successfully',
                'data'=> $data
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Not found',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
    }
    public function getAllDichVu(){
        $dich_vu = DB::table('dich_vus')
        ->join('loai_dich_vus','loai_dich_vus.id','dich_vus.id_loai_dich_vu')
        ->join('users', 'id_admin', 'users.id')
        ->select('dich_vus.*','users.Ten as display_name','loai_dich_vus.ten as ten_loai_dich_vu')
        ->orderBy('dich_vus.id','DESC')
        ->get();
		try {
            $result = array(
                'status' => 'OK',
                'message'=> 'Fetch Successfully',
                'data'=> $dich_vu
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Not found',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
    }
    public function getAllDichVuTheoLoai($id){
        $dich_vu = DB::table('dich_vus')
        ->join('loai_dich_vus','loai_dich_vus.id','dich_vus.id_loai_dich_vu')
        ->join('users', 'id_admin', 'users.id')
        ->select('dich_vus.*','users.Ten as display_name','loai_dich_vus.ten as ten_loai_dich_vu')
        ->where('dich_vus.id_loai_dich_vu','=',$id)
        ->orderBy('dich_vus.id','DESC')
        ->get();
		try {
            $result = array(
                'status' => 'OK',
                'message'=> 'Fetch Successfully',
                'data'=> $dich_vu
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Not found',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
	}
}
