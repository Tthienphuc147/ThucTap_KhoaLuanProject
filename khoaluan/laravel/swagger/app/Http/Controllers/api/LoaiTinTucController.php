<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\LoaiTinTuc;
use DB;
use Illuminate\Http\Response;
class LoaiTinTucController extends Controller
{
    public function getLoaiTinTuc($id_loai){
		$loai_tin_tucs = DB::table('loai_tin_tucs')->where('id','=',$id_loai)->first();
        try {

            $tin_theo_loai = DB::table('tin_tucs')
			->join('loai_tin_tucs','loai_tin_tucs.id','tin_tucs.id_loai_tin_tucs')
			->join('users', 'id_admin', 'users.id')
			->select('tin_tucs.*','users.Ten as display_name')
			->where('loai_tin_tucs.id','=',$id_loai)
			->orderBy('tin_tucs.id','DESC')
            ->get();
            $data = (object) ['loaitintuc' => $loai_tin_tucs,'tintheoloai' => $tin_theo_loai];
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
}
