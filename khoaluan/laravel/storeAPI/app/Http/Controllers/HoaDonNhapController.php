<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\HoaDonNhap;
use Carbon\Carbon;

class HoaDonNhapController extends Controller
{
	public function index()
	{

		return view('admin.hoadonnhap.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.hoadonnhap.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    	$request->validate([
    		'idUser'=>'required',
    		'NgayNhap'=>'required',
    		'idNCC'=>'required',
    	]);
    	$date=Carbon::createFromFormat('d-m-Y', $request->NgayNhap);
    	try {
    		hoadonnhap::create($request->only('idUser','idNCC')+['NgayNhap'=>$date,'TongTien'=>0]);
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Thêm thành công','type'=>'success']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(HoaDonNhap $hoadonnhap)
    {
        return view('admin.hoadonnhap.create_chitiet',compact('hoadonnhap'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(hoadonnhap $hoadonnhap)
    {

    	return view('admin.hoadonnhap.edit',compact('hoadonnhap'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, hoadonnhap $hoadonnhap)
    {
    	$request->validate([
    		'idUser'=>'required',
    		'NgayNhap'=>'required|date_format:"d-m-Y"',
    		'idNCC'=>'required',
    		
    	]);
    	$date=Carbon::createFromFormat('d-m-Y', $request->NgayNhap);
    	try {
    		$hoadonnhap->update($request->only('idUser','idNCC')+['NgayNhap'=>$date]);
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Sửa thành công','type'=>'success']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(hoadonnhap $hoadonnhap)
    {
    	try {
    		$hoadonnhap->delete();
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
