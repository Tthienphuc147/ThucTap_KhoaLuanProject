<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\KhuyenMai;
use Exception;
use Carbon\Carbon;
use DateTime;

class KhuyenMaiController extends Controller
{
	public function index()
	{

		return view('admin.khuyenmai.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.khuyenmai.create');
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
    		'MoTa'=>'required|min:2|max:300',
    		'NgayBD'=>'required',
    		'NgayKT'=>'required',
    	]);
    	if(Carbon::createFromFormat('d-m-Y H:i a', $request->NgayBD)>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayKT))
    	{
    		return back()->with(['thongbao'=>'Ngày kết thúc phải sau ngày bắt đầu','type'=>'danger']);
    	}
    	try {
    		KhuyenMai::create($request->only('Ten','MoTa')+['NgayBD'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayBD),'NgayKT'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayKT)]);
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
    public function show(KhuyenMai $khuyenmai)
    {


        return view('admin.khuyenmai.create_chitiet',compact('khuyenmai'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(KhuyenMai $khuyenmai)
    {

    	return view('admin.khuyenmai.edit',compact('khuyenmai'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KhuyenMai $khuyenmai)
    {
    	$request->validate([
    		'Ten'=>'required|min:2|max:100',
            'MoTa'=>'required|min:2|max:300',
            'NgayBD'=>'required',
            'NgayKT'=>'required',
    	]);
    	try {
    		$khuyenmai->update($request->only('Ten','MoTa')+['NgayBD'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayBD),'NgayKT'=>Carbon::createFromFormat('d-m-Y H:i a', $request->NgayKT)]);
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
    public function destroy(KhuyenMai $khuyenmai)
    {
    	try {
    		$khuyenmai->delete();
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
