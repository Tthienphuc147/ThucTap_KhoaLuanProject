<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class ProfileController extends Controller
{
    public function fetchExportOrder(Request $request){
    	
    	$query = '
    	SELECT 
    		hoa_don_xuats.* 
		,	chi_tiet_hoa_don_xuats."idSanPham"
		,	chi_tiet_hoa_don_xuats."DonGia"
		,	chi_tiet_hoa_don_xuats."SoLuong"
		,	san_pham_ban_muas."TenSanPham"
		,	san_pham_ban_muas."Hinh"
		,	trang_thais."Ten" AS "StatusName"
		,	p."Ten" as "PHUONG"
		,	q."Ten" as "QUAN"
		,	tp."Ten" as "THANHPHO"
		,	temp."Total"
    	FROM hoa_don_xuats
    	LEFT JOIN chi_tiet_hoa_don_xuats 
    	ON chi_tiet_hoa_don_xuats."idHDX" = hoa_don_xuats."id"
    	LEFT JOIN san_pham_ban_muas
    	ON san_pham_ban_muas."id" = chi_tiet_hoa_don_xuats."idSanPham"
    	LEFT JOIN dia_diems p
    	ON p."id" = hoa_don_xuats."idDiaDiem"
    	LEFT JOIN dia_diems q 
    	ON q."id" = p."idParent"
    	LEFT JOIN dia_diems tp 
    	ON tp."id" = q."idParent"
    	LEFT JOIN trang_thais
    	ON trang_thais."id" = hoa_don_xuats."idTrangThai"
    	LEFT JOIN(
			SELECT chi_tiet_hoa_don_xuats."idHDX", SUM(chi_tiet_hoa_don_xuats."SoLuong" * chi_tiet_hoa_don_xuats."DonGia") AS "Total"
			FROM chi_tiet_hoa_don_xuats
			GROUP BY chi_tiet_hoa_don_xuats."idHDX"
    	) temp 
    	ON temp."idHDX" = hoa_don_xuats."id"
    	WHERE hoa_don_xuats."idUser" = '.$request->idUser
   		;
    	$result = DB::select($query);
    	return response()->json($result,200);
    }
}
