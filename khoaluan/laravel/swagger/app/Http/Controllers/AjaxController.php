<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SanPhamBanMua;
use App\DanhMuc;
use App\DanhMucHinh;
use Cart;
use App\User;
use Exception;
use App\DiaDiem;
use App\KhuyenMai;
use App\ChiTietKhuyenMai;
use App\ChiTietHoaDonNhap;
use App\HoaDonXuat;
use App\ChiTietHoaDonXuat;
use App\HoaDonNhap;
use App\BangGia;
use App\DanhGia;
use DB;
use Carbon\Carbon;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Facades\Auth;

class AjaxController extends Controller
{
	function __construct()
	{
		$danhmuc=DanhMuc::all();
		$sanphamnoibat=SanPhamBanMua::all();

		view()->share('sanphamnoibat',$sanphamnoibat);
		view()->share('danhmuc',$danhmuc);
	}
	public function baocao1(Request $request){
		$ngaybd = Carbon::createFromFormat('d-m-Y',$request->ngaybd);
		$ngaykt = Carbon::createFromFormat('d-m-Y',$request->ngaykt);
		$hd=HoaDonXuat::where('updated_at',">",$ngaybd)->where('updated_at',"<",$ngaykt)->where('idTrangThai',4)->get();
		return $hd;
	}
	public function baocao2(Request $request){
		$ngaybd = Carbon::createFromFormat('d-m-Y',$request->ngaybd);
		$ngaykt = Carbon::createFromFormat('d-m-Y',$request->ngaykt);
		$sp=DB::table('san_pham_ban_muas')
		->join('chi_tiet_hoa_don_xuats','chi_tiet_hoa_don_xuats.idSanPham','san_pham_ban_muas.id')
		->join('hoa_don_xuats','hoa_don_xuats.id','chi_tiet_hoa_don_xuats.idHDX')
		->where('hoa_don_xuats.updated_at','>',$ngaybd)
		->where('hoa_don_xuats.updated_at','<',$ngaykt)
		->select('san_pham_ban_muas.id','san_pham_ban_muas.TenSanPham',DB::raw('SUM(chi_tiet_hoa_don_xuats.SoLuong) as soluong'))
		->groupBy('san_pham_ban_muas.id','san_pham_ban_muas.TenSanPham')
		->orderBy('soluong','desc')
		->get();

		return $sp;
	}
	public function addCart(Request $request){
		
		$sanpham=SanPhamBanMua::find($request->sanphamid);
		$soluongcart=0;
		foreach(Cart::content() as $item){
			if($item->id==$sanpham->id){
				$soluongcart=$item->qty;
			}
		}
		if($soluongcart+$request->soluong>10){
			return response()->json([
				'thongbao'=>false,
				'over'=>true,
			],200);
		}
		$soluongton=getSoLuongTon($sanpham->id);
		if($soluongton<$request->soluong+$soluongcart){
			return response()->json([
				'thongbao'=>false,
				'soluong'=>$soluongton
			],200);
		}
		else{
			
			$giatien=getTiLe($sanpham->id)*getbanggia($sanpham->id)->GiaBan;
			$madotnhap=getlohangdangban($sanpham->id)->id;
			Cart::add(['id' => $request->sanphamid, 'name' =>$sanpham->TenSanPham, 'qty' => $request->soluong, 'price' => $giatien, 'options' => ['nsx' => $sanpham->nhasanxuat->Ten,'hinh'=>$sanpham->Hinh,'madotnhap'=>$madotnhap]]);
			return response()->json([
				'thongbao'=>'ok',
			],200);
		}
		
	}
	public function deleteAll(){
		Cart::destroy();
		return response()->json([
			'thong bao'=>'xoa ok'
		],200);
	}
	public function deleteCart(Request $request){
		Cart::remove($request->rowid);
		return response()->json([
			'thong bao'=>'xoa ok'
		],200);
	}
	public function updateCart(Request $request){
		$soluongcart=0;
		$id=0;
		foreach(Cart::content() as $item){
			if($item->rowId==$request->rowid){
				$soluongcart=$item->qty;
				$id=$item->id;
			}
		}

		$soluongton=getSoLuongTon($id);
		if($request->soluong>10){
			return response()->json([
				'thongbao'=>false,
				'soluong'=>$soluongton,
				'over'=>true,
			],200);
		}
		if($soluongton<$request->soluong){
			return response()->json([
				'thongbao'=>false,
				'soluong'=>$soluongton
			],200);
		}
		else{
			Cart::update($request->rowid, $request->soluong);
			return response()->json([
				'thong bao'=>'update ok'
			],200);
		}
		
	}
	public function changethanhpho($id){
		echo "<option>Chọn quận/huyện</option>";
		foreach(DiaDiem::where('idParent',$id)->get() as $item)
		{
			echo "<option value='".$item->id."'>".$item->Ten."</option>";
		}
	}
	public function changequan($id){
		echo "<option>Chọn phường/xã</option>";
		foreach(DiaDiem::where('idParent',$id)->get() as $key=> $item)
		{
			echo "<option value='".$item->id."'>".$item->Ten."</option>";
		}
	}
	public function changesanpham($id){
		foreach(DanhMucHinh::where('idSanPham',$id)->get() as $key=> $item)
		{
			echo "<div class='col'>
			<img src='upload/sanpham/".$item->Hinh."' style='height:50px'>
			</div>";
		}
	}
	public function chuyentrangthai($idhd,$idtt){
		$hoadon=HoaDonXuat::find($idhd);
		try {
			$hoadon->update(['idTrangThai'=>$idtt]);
			if($idtt==5){
				foreach($hoadon->chitiethoadonxuat as $item){
					$cthoadonnhap=ChiTietHoaDonNhap::find($item->MaDotNhap);
					$soluongcu=$cthoadonnhap->SoLuongTon;
					$soluong=$item->SoLuong;
					$cthoadonnhap->update(['SoLuongTon'=>$soluongcu+$soluong]);
				}
			}
		} 
		catch (Exception $e) {
			return $e->getMessage();
		}
		return 'ok';
	}
	public function xemdonhang($idhd){
		$hoadon=HoaDonXuat::find($idhd);
		echo 
		"<h5>Hóa đơn: #".$idhd."</h5>
		<table class='table table-condensed table-striped table-bordered'>
		<caption>Tổng tiền: <span class='font-weight-bold text-gray-dark'>".number_format($hoadon->TongTien)."đ</span></caption>
		<thead>
		<tr>
		<th>ID</th>
		<th>Tên sản phẩm</th>
		<th>Hình</th>
		<th>Số lượng</th>
		<th>Đơn giá</th>
		<th>Mã đợt nhập</th>
		</tr>
		</thead>
		<tbody>";
		foreach(ChiTietHoaDonXuat::where('idHDX',$idhd)->get() as $item){
			echo	
			"<tr>
			<td>".$item->id."</td>
			<td>".$item->sanpham->TenSanPham."</td>
			<td><img src='upload/sanpham/".$item->sanpham->Hinh."' style='height:70px'></td>
			<td>".$item->SoLuong."</td>
			<td>".$item->DonGia."</td>
			<td>".$item->MaDotNhap."</td>
			</tr>";
		}

		echo
		"</tbody>
		</table>";
		
	}
	public function phanquyen($iduser,$idquyen){
		$user=User::findorFail($iduser);
		try {
			$user->update(['idQuyen'=>$idquyen]);
		} catch (Exception $e) {
			return $e->getMessage();
		}
		return 'ok';
	}
	public function chitietkhuyenmai($idkhuyenmai){
		$khuyenmai=KhuyenMai::find($idkhuyenmai);
		foreach($khuyenmai->chitietkhuyenmai as $item){
			echo 
			"<tr>
			<td>".$item->id."</td>
			<td>".$item->sanphambanmua->TenSanPham."</td>
			<td>".$item->TiLe."</td>
			</tr>";
		}
	}
	public function chitietHDN($idHDN){
		$hoadonnhap=HoaDonNhap::find($idHDN);
		foreach($hoadonnhap->chitiethoadonnhap as $item){
			echo 
			"<tr>
			<td>".$item->id."</td>
			<td><img src='upload/sanpham/".$item->sanphambanmua->Hinh."' style='height:70px'></td>
			<td>".$item->sanphambanmua->TenSanPham."</td>
			<td>".$item->SoLuong."</td>
			<td>".number_format($item->GiaNhap)."</td>
			<td>".number_format($item->GiaBan)."</td>
			<td>".$item->SoLuongTon."</td>
			</tr>";
		}
	}
	public function add_chitietkhuyenmai($idkhuyenmai, $idsanpham){
		if(ChiTietKhuyenMai::where('idKhuyenMai',$idkhuyenmai)->where('idSanPham',$idsanpham)->count()>0){
			return 'false';
		}
		try {
			$chitietKM=ChiTietKhuyenMai::create(['idKhuyenMai'=>$idkhuyenmai,'idSanPham'=>$idsanpham,'TiLe'=>0]);
			
		} catch (Exception $e) {
			return 'false';
		}
		echo 
		"<tr class='odd gradeX' align='center'>
		<td>". $chitietKM->id."</td>
		<td>".$chitietKM->sanphambanmua->TenSanPham."</td>
		<td><input class='text-center input_tile' type='text' value=".$chitietKM->TiLe." data_id='".$chitietKM->id."'></td>
		<td>".$chitietKM->created_at."</td>
		<td>".$chitietKM->updated_at."</td>
		<td class='center'><button class='btn far fa-trash-alt btn-outline-danger btn_edit ' data-id='".$chitietKM->id."' data-toggle='modal' data-target='#modalDelete'></button></td>
		</tr>";
	}
	public function add_chitietHDN($idHDN, $idsanpham){
		if(ChiTietHoaDonNhap::where('idHDN',$idHDN)->where('idSanPham',$idsanpham)->count()>0){
			return 'false';
		}
		try {
			$chitietHDN=ChiTietHoaDonNhap::create(['idHDN'=>$idHDN,'idSanPham'=>$idsanpham,'SoLuong'=>0,'GiaNhap'=>0,'GiaBan'=>0]);
			
		} catch (Exception $e) {
			return 'false';
		}
		echo 
		"<tr class='odd gradeX' align='center'>
		<td>". $chitietHDN->id."</td>
		<td>".$chitietHDN->sanphambanmua->TenSanPham."</td>
		<td><input class='text-center input_soluong' type='text' value=".$chitietHDN->SoLuong." data_id='".$chitietHDN->id."'></td>
		<td><input class='text-center input_gianhap' type='text' value=".$chitietHDN->GiaNhap." data_id='".$chitietHDN->id."'></td>
		<td><input class='text-center input_giaban' type='text' value=".$chitietHDN->GiaBan." data_id='".$chitietHDN->id."'></td>
		<td>0</td>
		<td>".$chitietHDN->created_at."</td>
		<td>".$chitietHDN->updated_at."</td>
		<td class='center'><button class='btn far fa-trash-alt btn-outline-danger btn_edit ' data-id='".$chitietHDN->id."' data-toggle='modal' data-target='#modalDelete'></button></td>
		</tr>";
	}
	public function update_tile($id,$tile){
		if($tile>1 || $tile<0){
			return 'false';
		}
		else{
			try {
				ChiTietKhuyenMai::find($id)->update(['TiLe'=>$tile]);

			} catch (Exception $e) {
				return 'false';
			}
			return 'true';
		}
		
	}
	public function update_soluong($id,$soluong){
		$tongtien=0;
		if($soluong>10000 || $soluong<0){
			update_TongTien_HDN($chitietHDN->hoadonnhap->id);
		}
		else{
			try {
				$chitietHDN=ChiTietHoaDonNhap::find($id);
				$soluong_old=$chitietHDN->SoLuong;
				$soluongton_old=$chitietHDN->SoLuongTon;
				$soluongton_new=$soluong - $soluong_old + $soluongton_old;
				$chitietHDN->update(['SoLuong'=>$soluong,'SoLuongTon'=>$soluongton_new]);
				$tongtien=update_TongTien_HDN($chitietHDN->hoadonnhap->id);
			} catch (Exception $e) {
				return update_TongTien_HDN($chitietHDN->hoadonnhap->id);
			}
			return number_format($tongtien);
		}
		
	}
	public function update_gianhap($id,$gianhap){
		$tongtien=0;
		if($gianhap<0){
			return update_TongTien_HDN($chitietHDN->hoadonnhap->id);
		}
		else{
			try {
				$chitietHDN=ChiTietHoaDonNhap::find($id);
				$chitietHDN->update(['GiaNhap'=>$gianhap]);
				$tongtien=update_TongTien_HDN($chitietHDN->hoadonnhap->id);
			} catch (Exception $e) {
				return update_TongTien_HDN($chitietHDN->hoadonnhap->id);
			}
			return number_format($tongtien);
		}
		
	}
	public function update_giaban($id,$giaban){
		$tongtien=0;
		if($giaban<0){
			return update_TongTien_HDN($chitietHDN->hoadonnhap->id);
		}
		else{
			try {
				$chitietHDN=ChiTietHoaDonNhap::find($id);
				$chitietHDN->update(['GiaBan'=>$giaban]);
				$tongtien=update_TongTien_HDN($chitietHDN->hoadonnhap->id);
			} catch (Exception $e) {
				return update_TongTien_HDN($chitietHDN->hoadonnhap->id);
			}
			return number_format($tongtien);
		}
		
	}
	public function updatelido(Request $request,$id){
		try {
			HoaDonXuat::find($id)->update(['LiDo'=>$request->LiDo]);
			
		} catch (Exception $e) {
			return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
		}
		return back();
		
	}
	public function load_cb_nhasanxuat(Request $request){
		$mang = collect(array_dm_to_array($request['danhmuc']))->unique();
		foreach($mang as $item){
			foreach(get_nhasanxuat($item) as $item2){
				echo "<div class='form-check-inline col-6 m-0'>
				<label class='form-check-label' >
				<input type='checkbox' class='form-check-input' value='".$item2->id."'  name='cb_".$item2->id ."' value='something' >".$item2->Ten."
				</label>
				</div>";
			}
		}
	}
	public function load_cb_subdanhmuc(Request $request){
		$mang=$request['danhmuc'];
		foreach($mang as $item){
			foreach(getsub_danhmuc($item) as $item2){
				echo "<div class='form-check-inline col-6 m-0'>
				<label class='form-check-label' >
				<input type='checkbox' class='form-check-input' value='".$item2->id."'  name='cb_".$item2->id ."' value='something' >".$item2->Ten."
				</label>
				</div>";
			}
		}
	}
	public function load_cb_subdanhmuc2(Request $request){
		$mang=$request['danhmuc'];
		foreach($mang as $item){
			foreach(getsub_danhmuc($item) as $item2){
				echo "<div class='form-check-inline col-6 m-0'>
				<label class='form-check-label' >
				<input type='checkbox' class='form-check-input' value='".$item2->id."'  name='cb_".$item2->id ."' value='something' >".$item2->Ten."
				</label>
				</div>";
			}
		}
	}
	public function postdanhgia(Request $request){
		$now = Carbon::now();
		$count=DB::table('hoa_don_xuats')
		->join('chi_tiet_hoa_don_xuats','hoa_don_xuats.id','=','chi_tiet_hoa_don_xuats.idHDX')
		->where('idUser',Auth::user()->id)
		->where('idSanPham',$request->idSanPham)
		->where('idTrangThai',4)->count();
		$danhgia=null;
		$count2=DanhGia::where('idSanPham',$request->idSanPham)->where('idUser',Auth::user()->id)->count();
		if($count>0 && $count2==0){
			try {
				$danhgia=DanhGia::create($request->all()+['idUser'=>Auth::user()->id]);
				
			} catch (Exception $e) {
				return $e->getMessage();
			}
			return response()->json([
				'error'=>false,
				'thongbao'=>'Danh gia thanh cong',

			],200);
		}
		else{
			return response()->json([
				'error'=>true,
				'thongbao'=>'Khong duoc phep danh gia',

			],200);
		}
		
	}
	public function loadrating($idsanpham){
		return view('subpage.loadrating',compact('idsanpham'));
	}
	public function loadrating_viewmore($idsanpham){
		return view('subpage.rating_viewmore',compact('idsanpham'));
	}
	public function danhgia_del($id){
		$danhgia=DanhGia::find($id);
		try {
			$danhgia->delete();
		} catch (Exception $e) {
			return response()->json([
				'error'=>true,
			],200);
		}
		return response()->json([
			'error'=>false,
		],200);
	}
}
