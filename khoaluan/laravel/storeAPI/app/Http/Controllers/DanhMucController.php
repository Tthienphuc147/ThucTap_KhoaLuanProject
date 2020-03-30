<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DanhMuc;
use Validator;
use Exception;


class DanhMucController extends Controller
{
	public function index()
	{

		return view('admin.danhmuc.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.danhmuc.create');
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
    		DanhMuc::create($request->all());
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
    public function edit(DanhMuc $danhmuc)
    {

    	return view('admin.danhmuc.edit',compact('danhmuc'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DanhMuc $danhmuc)
    {
    	$request->validate([
    		'Ten'=>'required|min:2|max:100',
    		'Hinh'=>'required|min:2|max:100'
    	]);
    	try {
    		$danhmuc->update($request->all());
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
    public function destroy(DanhMuc $danhmuc)
    {
        try {
        	$danhmuc->delete();
        } catch (Exception $e) {
        	return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
