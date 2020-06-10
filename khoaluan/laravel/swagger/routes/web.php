<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
// add any additional headers you need to support here
header('Access-Control-Allow-Headers: Origin, Content-Type,X-Requested-With,Authorization');


Carbon\Carbon::setLocale('vi');


Route::post('fetch_data','PageController@fetch_data');

Route::get('/danhsach1', 'PageController@danhsach')->name('danhsach');
Route::get('/', function () {
	return redirect('home');
});
Route::get('home','PageController@getHome');
Route::get('trangchu','PageController@getTrangChu');
Route::get('sanphamchitiet/{id}','PageController@getSanPhamChiTiet');
Route::get('cart','PageController@getCart');
Route::post('add','AjaxController@addCart');
Route::view('count_cart','subpage.count_cart');
Route::view('total_cart','subpage.total_cart');
Route::view('cart_mini','subpage.cart_mini');
Route::view('profile','pages.profile')->middleware('user','verified');
Route::get('loaisanpham/{iddanhmuc}','PageController@loaiSanPham');
Route::post('reset-password', 'ResetPasswordController@sendMail');
Route::get('reset-password/{token}','ResetPasswordController@showreset');
Route::post('reset-password/{token}','ResetPasswordController@reset');
Route::post('change_password','UserController@change_password');

Route::resource('myregister','RegisterController');
Route::post('mylogin','LoginController@authenticate');
Route::get('logout','LoginController@logout');
Route::group(['prefix' => 'ajax'], function () {
	Route::group(['prefix' => 'cart'], function () {
		Route::post('add','AjaxController@addCart');
		Route::post('delete_all','AjaxController@deleteAll');
		Route::post('delete','AjaxController@deleteCart');
		Route::post('update','AjaxController@updateCart');
	});
	Route::post('upload_img_profile','UserController@upload_img_profile');
	Route::post('load_cb_nhasanxuat','AjaxController@load_cb_nhasanxuat');
	Route::post('load_cb_subdanhmuc','AjaxController@load_cb_subdanhmuc');
	Route::post('load_cb_subdanhmuc2','AjaxController@load_cb_subdanhmuc2');
	Route::post('rating','AjaxController@postdanhgia');
	Route::get('rating/{idsanpham}','AjaxController@loadrating');
	Route::get('rating_viewmore/{idsanpham}','AjaxController@loadrating_viewmore');
	Route::get('danhgia/del/{id}','AjaxController@danhgia_del');
});
Route::get('listnsx/{iddanhmuc}','PageController@getNhaSanXuat');
Route::get('thanhtoan','PageController@getThanhToan')->middleware('cart','guest_or_user');
Route::post('thanhtoan','PageController@postThanhToan')->middleware('cart','guest_or_user');
Route::get('thanhtoanthanhcong/{id}','PageController@getThanhToanThanhCong');

Route::group(['prefix'=>'ajax'],function(){
	Route::get('changethanhpho/{id}','AjaxController@changethanhpho');
	Route::get('changequan/{id}','AjaxController@changequan');
	Route::get('changesanpham/{id}','AjaxController@changesanpham');
	Route::get('xemdonhang/{donhang}','AjaxController@xemdonhang');
});

Route::resource('danhgia','DanhGiaController');
Route::group(['prefix'=>'admin','middleware'=>'nhanvien'],function(){
	Route::group(['prefix'=>'ajax'],function(){
		Route::get('chuyentrangthai/{donhang}/{trangthai}','AjaxController@chuyentrangthai');
		Route::get('xemdonhang/{donhang}','AjaxController@xemdonhang');
		Route::get('phanquyen/{iduser}/{idquyen}','AjaxController@phanquyen');
		Route::get('chitietkhuyenmai/{id}','AjaxController@chitietkhuyenmai');
		Route::get('add_chitietkhuyenmai/{idkhuyenmai}/{idsanpham}','AjaxController@add_chitietkhuyenmai');
		Route::get('chitietHDN/{id}','AjaxController@chitietHDN');
		Route::get('add_chitietHDN/{idHDN}/{idsanpham}','AjaxController@add_chitietHDN');
		Route::get('update_tile/{id}/{tile}','AjaxController@update_tile');
		Route::get('update_soluong/{id}/{soluong}','AjaxController@update_soluong');
		Route::get('update_gianhap/{id}/{gianhap}','AjaxController@update_gianhap');
		Route::get('update_giaban/{id}/{giaban}','AjaxController@update_giaban');
		Route::post('updatelido/{id}','AjaxController@updatelido');
		Route::post('baocao1','AjaxController@baocao1');
		Route::post('baocao2','AjaxController@baocao2');
	});
	Route::get('/',function(){
		return view('admin/layout/index');
	});
	Route::resource('hoadonxuat','HoaDonXuatController');
	Route::resource('hoadonnhap','HoaDonNhapController');
	Route::resource('trangthai','TrangThaiController');
	Route::resource('quyen','QuyenController')->middleware('admin');
	Route::resource('user','UserController')->middleware('admin');
	Route::get('phanquyen',function(){
		return view('admin.user.phanquyen');
	})->middleware('admin');
	Route::resource('sanpham','SanPhamBanMuaController');
	Route::resource('danhmuc','DanhMucController');
	Route::resource('diadiem','DiaDiemController');
	Route::resource('nhasanxuat','NhaSanXuatController');
	Route::resource('nhacungcap','NhaCungCapController');
	Route::resource('khuyenmai','KhuyenMaiController');
	Route::resource('chitietkhuyenmai','ChiTietKhuyenMaiController');
	Route::resource('chitiethoadonnhap','ChiTietHoaDonNhapController');
	Route::resource('danhmuchinh','DanhMucHinhController');
	Route::resource('baocao','BaoCaoController');
});

Auth::routes(['verify' => true]);
