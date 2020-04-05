<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
// add any additional headers you need to support here
header('Access-Control-Allow-Headers: Origin, Content-Type,X-Requested-With,Authorization');
Route::any('/ckfinder/browser', 'MyCKFinderController@browserAction')
->name('ckfinder_browser');
Route::any('/ckfinder/connector', 'MyCKFinderController@requestAction')
->name('ckfinder_connector');
Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});


// Route::get('sanphams', 'api\SanPhamController@index');

// Route::get('sanphams/{id}', 'api\SanPhamController@show')->name('sanphams.show');


// Route::post('sanphams', 'api\SanPhamController@store')->name('sanphams.store');
// Route::put('sanphams/{id}', 'api\SanPhamController@update')->name('sanphams.update');
// Route::patch('sanphams/{id}', 'api\SanPhamController@update')->name('sanphams.update');
// Route::delete('sanphams/{id}', 'api\SanPhamController@destroy')->name('sanphams.destroy');
// Route::get('danhmucs', 'api\DanhMucController@index');
// Route::get('nhasanxuats', 'api\NhaSanXuatController@index');
// Route::post('nhasanxuats', 'api\NhaSanXuatController@store');
// Route::delete('nhasanxuats/{id}', 'api\NhaSanXuatController@destroy');
// Route::get('nhasanxuats/{id}', 'api\NhaSanXuatController@show');
// Route::put('nhasanxuats/{id}','api\NhaSanXuatController@update');

Route::resource('nhacungcap', 'Api\NhaCungCapController');
Route::resource('nhasanxuat', 'Api\NhaSanXuatController');
Route::resource('danhmuc', 'Api\DanhMucController');
Route::resource('sanpham', 'Api\SanPhamController');
Route::resource('chitietkhuyenmai', 'Api\ChiTietKhuyenMaiController');
Route::resource('khuyenmai', 'Api\KhuyenMaiController');
Route::resource('danhmuchinh', 'Api\DanhMucHinhController');
Route::resource('user', 'Api\UserController');
Route::put('user/{id}/changehinh','Api\UserController@changehinh');
Route::resource('quyen', 'Api\QuyenController');
Route::resource('danhgia', 'Api\DanhGiaController');
Route::resource('hoadonnhap', 'Api\HoaDonNhapController');
Route::resource('trangthai', 'Api\TrangThaiController');
Route::resource('chitiethoadonnhap', 'Api\ChiTietHoaDonNhapController');
Route::resource('chitiethoadonxuat', 'Api\ChiTietHoaDonXuatController');
Route::resource('hoadonxuat', 'Api\HoaDonXuatController');
Route::resource('diadiem', 'Api\DiaDiemController');
Route::resource('home', 'Api\HomePageController');
Route::get('get-hot-sell', 'Api\HomePageController@getHotSellProduct');
Route::resource('product-detail', 'Api\ProductDetailController');
Route::post('get-image', 'Api\ProductDetailController@getImage');
Route::post('check-bill', 'Api\ProductDetailController@checkBill');
Route::post('create-rating', 'Api\ProductDetailController@createRating');
Route::post('delete-rating', 'Api\ProductDetailController@deleteRating');
Route::post('baocao_donhang','Api\BaoCaoController@baocao_donhang');
Route::post('baocao_topsanpham','Api\BaoCaoController@baocao_topsanpham');
Route::post('baocao_luotmua','Api\BaoCaoController@baocao_luotmua');
Route::post('baocao_giatridonhang','Api\BaoCaoController@baocao_giatridonhang');
Route::get('get_array_top','Api\BaoCaoController@get_array_top');
Route::post('authenticate','Api\LoginController@authenticate');
Route::post('register','Api\LoginController@register');
Route::resource('data','Api\DataController');
Route::post('reset_password','Api\ResetPasswordController@sendMail');
Route::post('password_reset/reset','Api\ResetPasswordController@reset_pass');
Route::post('profile/doimatkhau','Api\UserController@doimatkhau');
Route::get('password_reset','Api\ResetPasswordController@index');
Route::post('submit-order','Api\OrderController@submitOrder');
Route::get('test','Api\OrderController@test');
Route::post('signup', 'Api\AuthController@register'); 
Route::post('login', 'Api\AuthController@login');
Route::get('danhgia-fetch', 'Api\DanhGiaController@fetchList');
Route::post('khuyenmai-refer-detail', 'Api\KhuyenMaiController@referDetail');
Route::post('hoadonnhap-refer-detail', 'Api\ChiTietHoaDonNhapController@referDetail');
Route::post('hoadonxuat-refer-detail', 'Api\ChiTietHoaDonXuatController@referDetail');
Route::post('hoadonxuat-filter','Api\HoaDonXuatController@filterByIdTrangThai');
Route::post('doanhthutheothang','Api\BaoCaoController@getDoanhThuTheoThang');
Route::group(['namespace' => 'Api','middleware' => 'jwt.auth'], function () { 
	Route::get('auth', 'AuthController@user');
	Route::post('logout', 'AuthController@logout');
	Route::post('fetch-export-order','ProfileController@fetchExportOrder');

});

Route::middleware('jwt.refresh')->get('/token/refresh', 'AuthController@refresh');
