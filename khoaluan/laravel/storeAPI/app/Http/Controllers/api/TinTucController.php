<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\TinTuc;
use DB;
use Illuminate\Http\Response;
class TinTucController extends Controller
{
    public function getTinTuc($id_tin_tuc){
        $tin_tuc = DB::table('tin_tucs')->where('tin_tucs.id','=',$id_tin_tuc)
        ->join('loai_tin_tucs','loai_tin_tucs.id','tin_tucs.id_loai_tin_tucs')
        ->select('tin_tucs.*','loai_tin_tucs.ten as ten_loai_tin_tuc')
        ->first();
		$admin = DB::table('users')->where('id','=',$tin_tuc->id_admin)->first();
		try {
            $data = (object) ['tintuc' => $tin_tuc,'admin' => $admin];
			DB::table('tin_tucs')
			->where('id', $id_tin_tuc)
			->update(['luot_xem' => $tin_tuc->luot_xem + 1]);
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
    public function getAllTinTuc(){
        $tin_tuc = DB::table('tin_tucs')
        ->join('loai_tin_tucs','loai_tin_tucs.id','tin_tucs.id_loai_tin_tucs')
        ->join('users', 'id_admin', 'users.id')
        ->select('tin_tucs.*','users.Ten as display_name','loai_tin_tucs.ten as ten_loai_tin_tuc')
        ->orderBy('tin_tucs.id','DESC')
        ->get();
		try {
            $result = array(
                'status' => 'OK',
                'message'=> 'Fetch Successfully',
                'data'=> $tin_tuc
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
    public function getAllTinTucTheoLoai($id){
        $tin_tuc = DB::table('tin_tucs')
        ->join('loai_tin_tucs','loai_tin_tucs.id','tin_tucs.id_loai_tin_tucs')
        ->join('users', 'id_admin', 'users.id')
        ->select('tin_tucs.*','users.Ten as display_name','loai_tin_tucs.ten as ten_loai_tin_tuc')
        ->where('tin_tucs.id_loai_tin_tucs','=',$id)
        ->orderBy('tin_tucs.id','DESC')
        ->get();
		try {
            $result = array(
                'status' => 'OK',
                'message'=> 'Fetch Successfully',
                'data'=> $tin_tuc
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
