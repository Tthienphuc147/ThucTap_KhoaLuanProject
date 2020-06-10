<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NhaCungCap;
class NhaCungCapController extends Controller
{
    public function index()
	{

		return view('admin.nhacungcap.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.nhacungcap.create');
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
    	
    	]);
    	try {
    		nhacungcap::create($request->all());
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
    public function edit(nhacungcap $nhacungcap)
    {

    	return view('admin.nhacungcap.edit',compact('nhacungcap'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, nhacungcap $nhacungcap)
    {
    	$request->validate([
    		'Ten'=>'required|min:2|max:100',
    		
    	]);
    	try {
    		$nhacungcap->update($request->all());
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
    public function destroy(nhacungcap $nhacungcap)
    {
        try {
        	$nhacungcap->delete();
        } catch (Exception $e) {
        	return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
