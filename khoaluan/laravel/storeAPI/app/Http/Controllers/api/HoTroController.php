<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB,Mail;

class HoTroController extends Controller
{
    //
	public function sendContact(Request $request){
		$cart = json_decode($request['cart']);
		DB::beginTransaction();
		try {

            $new_contact = DB::table('ho_tros')->insert(
                [
                    'ho_ten' => $request->ten_lien_he,
                    'email' => $request->mail_lien_he,
                    'lien_he' => $request->lien_he,
                    'noi_dung' => $request->loi_nhan,
                    'is_read' => false,
                    'is_send' => false,
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")
                ]
            );

            DB::commit();
			return response()->json(['data'=>$new_contact,'ERROR'=>false],200);
        } catch (Exception $e) {
        	DB::rollBack();
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }

	}
}
