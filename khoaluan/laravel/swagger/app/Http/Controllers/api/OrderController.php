<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB,Mail;
use App\HoaDonXuat;
use App\ChiTietHoaDonXuat;

class OrderController extends Controller
{
    //
	public function submitOrder(Request $request){
		$cart = json_decode($request['cart']);
		DB::beginTransaction();
		try {
			//
            $order= HoaDonXuat::create($request->only('NguoiNhan','DiaChi','DienThoai','idUser','idDiaDiem','idTrangThai'));
            //
            foreach ($cart as $key => $value) {
				$idSanPham = $value->idSanPham;
				$qty = $value->SoLuong;
				while($qty > 0){
					$query = '
					SELECT
					san_pham_ban_muas."id" AS "idSanPham",
					MAX(temp."GiaBan") as "price",
					temp."id" AS "MaDotNhap",
					temp."GiaBan",
					(COALESCE(temp."SoLuongNhap",0) - COALESCE(temp."SoLuongXuat",0)) AS "SLT",
					temp2."rate"
					FROM san_pham_ban_muas
					LEFT JOIN(
						SELECT
						chi_tiet_hoa_don_nhaps."id",
						chi_tiet_hoa_don_nhaps."idSanPham",
						chi_tiet_hoa_don_nhaps."GiaBan",
						chi_tiet_hoa_don_nhaps."SoLuong" as "SoLuongNhap",
						SUM(tempExport."SoLuong") as "SoLuongXuat"
						FROM chi_tiet_hoa_don_nhaps


						-- LEFT JOIN chi_tiet_hoa_don_xuats
						-- ON  chi_tiet_hoa_don_nhaps."id" = chi_tiet_hoa_don_xuats."MaDotNhap"

						LEFT JOIN (
		                    SELECT * FROM chi_tiet_hoa_don_xuats
		                    INNER JOIN hoa_don_xuats
		                    ON hoa_don_xuats."id" = chi_tiet_hoa_don_xuats."idHDX"
		                    AND hoa_don_xuats."idTrangThai" <> 5
		                ) tempExport
		                ON tempExport."MaDotNhap" = chi_tiet_hoa_don_nhaps."id"


						GROUP BY  chi_tiet_hoa_don_nhaps."id", chi_tiet_hoa_don_nhaps."idSanPham"
						HAVING (chi_tiet_hoa_don_nhaps."SoLuong" > SUM(tempExport."SoLuong") OR SUM(tempExport."SoLuong") IS NULL)
					) temp
					ON temp."idSanPham" = san_pham_ban_muas."id"
					LEFT JOIN (
						SELECT MAX(chi_tiet_khuyen_mais."TiLe") as rate, chi_tiet_khuyen_mais."idSanPham"
						FROM khuyen_mais
						LEFT JOIN chi_tiet_khuyen_mais
						ON chi_tiet_khuyen_mais."idKhuyenMai" = khuyen_mais."id"
						WHERE khuyen_mais."NgayBD" <= current_date
						AND khuyen_mais."NgayKT" >= current_date
						GROUP BY chi_tiet_khuyen_mais."idSanPham"
					) temp2
					ON temp2."idSanPham" = san_pham_ban_muas."id"
					WHERE san_pham_ban_muas."id" = '.$idSanPham.'
					GROUP BY san_pham_ban_muas."id",temp2."rate", temp."SoLuongNhap", temp."SoLuongXuat",temp."GiaBan", temp."id"
					ORDER BY temp."GiaBan" DESC
					LIMIT 1
					';
					$result= DB::select($query)[0];
					if($result->SLT >= $qty) {
						$orderDetail			= 	new ChiTietHoaDonXuat;
		                $orderDetail->idHDX		= 	$order->id;
		                $orderDetail->SoLuong 	= 	$qty;
		                $orderDetail->DonGia	= 	$result->price * (1 - $result->rate);
		                $orderDetail->MaDotNhap	= 	$result->MaDotNhap;
		                $orderDetail->idSanPham	= 	$result->idSanPham;
		                $orderDetail->save();

					}else{
						$orderDetail			= 	new ChiTietHoaDonXuat;
		                $orderDetail->idHDX		= 	(int)$order->id;
		                $orderDetail->SoLuong 	= 	(int)$result->SLT;
		                $orderDetail->DonGia	= 	$result->price * (1 - $result->rate);
		                $orderDetail->MaDotNhap	= 	(int)$result->MaDotNhap;
		                $orderDetail->idSanPham	= 	(int)$result->idSanPham;
		                $orderDetail->save();
					}
					$qty -= 	(int)$result->SLT;
				}
			}
			$total = DB::select('select sum("SoLuong" * "DonGia") from chi_tiet_hoa_don_xuats where "idHDX" = '.$order->id.' group by "idHDX"');
            Mail::send('mail.thong_bao_dat_hang', $total, function($msg) use ($order){
                $msg->from('rumkc147@gmail.com',"Cửa hàng PHUC STORE");
                $msg->to('dthienphuc147@gmail.com', 'phuc')
                ->subject('Bạn đã đặt hàng thành công!');
            });
            DB::commit();
			return response()->json(['order'=>$order,'total' => $total,'ERROR'=>false],200);
        } catch (Exception $e) {
        	DB::rollBack();
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }

	}




	public function test(){
		$test =DB::select("delete from hoa_don_xuats where hoa_don_xuats.created_at > '2019/12/14'");
		return false;
	}
}
