<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DanhMuc;
use App\DanhMucHinh;
use App\SanPhamBanMua;
use App\HoaDonXuat;
use App\ChiTietHoaDonXuat;
use App\ChiTietHoaDonNhap;
use Cart;
use Validator;
use DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderShipped;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{


    public function __construct()
    {
    	$danhmuc=DanhMuc::all();
    	$sanphamnoibat=SanPhamBanMua::all();
    	
    	view()->share('sanphamnoibat',$sanphamnoibat);
        view()->share('danhmuc',$danhmuc);

    }
    public function getHome(){
        return view('home');
    }
    public function fetch_data(Request $request){

        $sanphams;
        if(isset($request['sort'])){
            $sanphams =SanPhamBanMua::orderBy('id',$request['sort'][0]);
        }
        if(isset($request['date'])){
            $sanphams =SanPhamBanMua::orderBy('updated_at',$request['sort'][0]);
        }
        if(isset($request['hang'])){
            $sanphams =$sanphams->whereIn('idNSX',$request['hang']);
        }
        if(isset($request['danhmuc'])){
            $mang = collect(array_dm_to_array($request['danhmuc']))->unique();
            $sanphams =$sanphams->whereIn('idDanhMuc',$mang);
        }
        if(isset($request['subdanhmuc'])){
            $mang = collect(array_dm_to_array($request['subdanhmuc']))->unique();
            $sanphams =$sanphams->whereIn('idDanhMuc',$mang);
        }
        if(isset($request['subdanhmuc2'])){
            $mang = collect(array_dm_to_array($request['subdanhmuc2']))->unique();
            $sanphams =$sanphams->whereIn('idDanhMuc',$mang);
        }
        $sanphams = $sanphams->paginate(12);


        return view('subpage.filter_data',compact('sanphams'));
    }
    public function danhsach(Request $request){
        $loaisanpham = new sanphambanmua ;// tạo đối tượng cần filter

        $queries = []; // tạo danh sách truy vấn để lọc

        $columns = [
            'TenSanPham',
            'idNSX' // mảng chứa các thuộc tính cần lọc
        ];

        foreach ($columns as $column) {
            if ($request->has($column)) { // nếu trên url có chứa tham số $column
                $loaisanpham = $loaisanpham->where($column,'like', '%' .$request->get($column). '%' ); // thì dùng lênh where với giá trị tham số đó
                $queries[$column] = $request->get($column); // thêm giá trị tham số $column vào $queries
            }
        }


        if ($request->has('sort')) {
            $loaisanpham = $loaisanpham->orderBy('TenSanPham', $request->get('sort'));
            $queries['sort'] = request('sort');
        }

        $loaisanpham = $loaisanpham->paginate(12)->appends($queries); 

        return view('pages.loaisanpham', compact('loaisanpham'));
    }
    public function getTrangChu(){
        $sanphamnoibat=SanPhamBanMua::all();
        $sanphammoi=SanPhamBanMua::orderBy('updated_at','desc')->take(8)->get();
        $sanphamkhuyenmai=SanPhamBanMua::all()->take(8);

        $mangNSX_dt=SanPhamBanMua::where('idDanhMuc',1)->pluck('idNSX')->unique();

        return view('pages.trangchu',compact('sanphamkhuyenmai','sanphamnoibat','sanphammoi'));
    }
    public function getSanPhamChiTiet($id){
        $sanphamcurrent=SanPhamBanMua::find($id);
        $danhmuchinh=DanhMucHinh::where('idSanPham',$id)->get();
        return view('pages.sanphamchitiet',compact('sanphamcurrent','danhmuchinh'));
    }
    public function getCart(){
        return view('pages.cart');
    }
    public function loaiSanPham($iddanhmuc){
        if($iddanhmuc==0){
            $loaisanpham=SanPhamBanMua::all();
            $danhmuc_cur="Sản phẩm";
        }
        else{
            $loaisanpham=SanPhamBanMua::whereIn('idDanhMuc',getallsub_danhmuc($iddanhmuc))->get();
            $danhmuc_cur=DanhMuc::find($iddanhmuc)->Ten;
        }
        
        
        return view('pages.loaisanpham',compact('loaisanpham','danhmuc_cur'));
    }
    public function getNhaSanXuat($idDanhMuc){
        $sanpham=SanPhamBanMua::where('idDanhMuc',$idDanhMuc)->pluck('idNSX')->unique();
        dd($sanpham);
        return view('page.listnhasanxuat',compact('sanpham'));
    }
    public function getThanhToan(){
        return view('pages.thanhtoan');
    }
    public function postThanhToan(Request $request){
        $messages=[
            'NguoiNhan.required'=>'Bạn chưa nhập tên người nhận',
            'DienThoai.required'=>'Bạn chưa nhập điện thoại',
            'DiaChi.required'=>'Bạn chưa nhập địa chỉ',
            'idDiaDiem.required'=>'Bạn chưa chọn địa điểm',
        ];
        $request->validate([
            'NguoiNhan'=>'required|min:3|max:255',
            'DienThoai'=>'required|min:7|max:15',
            'idDiaDiem'=>'required',
            'DiaChi'=>'required|min:3|max:255',
            'phuongthuctt'=>'required',
        ],$messages);
        $trangthai=1;
        $iduser=Auth::check()?auth()->user()->id:null;
        if($request->phuongthuctt!=1){
            $trangthai=1;
        }
        try {
            $hoadon=HoaDonXuat::create($request->only(['idDiaDiem','DiaChi','NguoiNhan','DienThoai'])+['idUser'=>$iduser,'idTrangThai'=>$trangthai,'TongTien'=>getTongTienCart(Cart::content())]);
            if(getTongTienCart(Cart::content())==0)
            {
                Cart::destroy();
                return redirect('trangchu')->with(['alert_hethang'=>'Sản phẩm này hiện đã hết hàng! Quý khách vui lòng chọn sản phẩm khác']);
            }
            foreach(Cart::content() as $item){
                if(getbanggia($item->id)==null){

                }
                else{
                    ChiTietHoaDonXuat::create(['idHDX'=>$hoadon->id,'idSanPham'=>$item->id,'SoLuong'=>$item->qty,'DonGia'=>getTiLe($item->id)*getbanggia($item->id)->GiaBan ,'MaDotNhap'=>$item->options->madotnhap]);
                    $soluong_cart=$item->qty;
                    while($soluong_cart>0){
                        $lohang=getlohangdangban($item->id);
                        if($soluong_cart<$lohang->SoLuongTon){
                            $sl=$lohang->SoLuongTon;
                            $lohang->update(['SoLuongTon'=>$sl - $soluong_cart]);
                            $soluong_cart=0;
                        }
                        else{ 
                            $sl=$lohang->SoLuongTon;
                            $lohang->update(['SoLuongTon'=>0]);
                            $soluong_cart=$soluong_cart-$sl;
                        }
                    }  
                }
            }
        } catch (Exception $e) {
            return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        Cart::destroy();
        if(Auth::check()){
            Mail::to(auth()->user())->queue(new OrderShipped($hoadon));
        }

        return redirect('thanhtoanthanhcong/'.$hoadon->id);

    }
    public function getThanhToanThanhCong($id){
        $hoadon=HoaDonXuat::find($id);
        return view('pages.thanhtoanthanhcong',compact('hoadon'));
    }
}
