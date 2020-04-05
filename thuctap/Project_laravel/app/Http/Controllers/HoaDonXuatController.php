<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\HoaDonXuat;
class HoaDonXuatController extends Controller
{
	public function index()
	{

		return view('admin.hoadonxuat.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.hoadonxuat.create');
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
    		'Ten'=>'required|min:2|max:100',
    		'Hinh'=>'required|min:2|max:100'
    	]);
    	try {
    		hoadonxuat::create($request->all());
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
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(HoaDonXuat $hoadonxuat)
    {

    	return view('admin.hoadonxuat.edit',compact('hoadonxuat'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HoaDonXuat $hoadonxuat)
    {
    	$request->validate([
    		'Ten'=>'required|min:2|max:100',
    		'Hinh'=>'required|min:2|max:100'
    	]);
    	try {
    		$hoadonxuat->update($request->all());
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
    public function destroy(HoaDonXuat $hoadonxuat)
    {
    	try {
    		$hoadonxuat->delete();
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
