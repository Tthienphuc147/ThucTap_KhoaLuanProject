<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChiTietHoaDonNhap;
use App\BangGia;
class ChiTietHoaDonNhapController extends Controller
{
	public function index()
	{

		return view('admin.chitiethoadonnhap.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.chitiethoadonnhap.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return "store";
    	
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
    public function edit(chitiethoadonnhap $chitiethoadonnhap)
    {

    	return view('admin.chitiethoadonnhap.edit',compact('chitiethoadonnhap'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, chitiethoadonnhap $chitiethoadonnhap)
    {
    	$request->validate([
    		'Ten'=>'required|min:2|max:100',
    		'Hinh'=>'required|min:2|max:100'
    	]);
    	try {
    		$chitiethoadonnhap->update($request->all());
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
    public function destroy(chitiethoadonnhap $chitiethoadonnhap)
    {
    	try {
    		$chitiethoadonnhap->delete();
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
