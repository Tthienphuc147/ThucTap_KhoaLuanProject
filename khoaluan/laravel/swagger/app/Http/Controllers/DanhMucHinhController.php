<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DanhMucHinh;
use File;

class DanhMucHinhController extends Controller
{
	public function index()
	{

		return view('admin.danhmuchinh.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.danhmuchinh.create');
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
    		'idSanPham'=>'required',
    		'Hinh'=>'required'
    	]);
    	$Hinh;
    	if($request->hasFile('Hinh'))
    	{
    		$file=$request->file('Hinh');
    		$duoi=$file->getClientOriginalExtension();
    		if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg')
    		{
    			return back()->with(['thongbao'=>'Bạn chỉ được chọn đuôi jpg png jpeg','type'=>'danger']);
    		}
    		$name=$file->getClientOriginalName();
    		$Hinh= str_random(4)."_".$name;
    		while(file_exists("upload/sanpham/".$Hinh))
    		{
    			$Hinh= str_random(4)."_".$name;
    		}
    		$file->move("upload/sanpham",$Hinh);
    	}
    	try {
    		$danhmuchinh=DanhMuchinh::create($request->only('idSanPham')+['Hinh'=>$Hinh]);
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Thêm thành công','type'=>'success','hold'=>$request->idSanPham]);
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
    public function edit(DanhMuchinh $danhmuchinh)
    {

    	return view('admin.danhmuchinh.edit',compact('danhmuchinh'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DanhMuchinh $danhmuchinh)
    {
    	$request->validate([
    		'idSanPham'=>'required',
    		'Hinh'=>'required'
    	]);
        $oldname=$danhmuchinh->Hinh;
        $Hinh=$request->Hinh;
        if($request->hasFile('Hinh'))
        {
            $file=$request->file('Hinh');
            $duoi=$file->getClientOriginalExtension();
            if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg')
            {
                return back()->with(['thongbao'=>'Bạn chỉ được chọn đuôi jpg png jpeg','type'=>'danger']);
            }
            $name=$file->getClientOriginalName();
            $Hinh= str_random(4)."_".$name;
            while(file_exists("upload/sanpham/".$Hinh))
            {
                $Hinh= str_random(4)."_".$name;
            }
            $file->move("upload/sanpham",$Hinh);
        }

        try {
            $danhmuchinh->update($request->only('idSanPham')+['Hinh'=>$Hinh]);
        } catch (Exception $e) {
            return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        if(File::exists("upload/sanpham/".$oldname))
        {
            File::delete("upload/sanpham/".$oldname);
        }
        return back()->with(['thongbao'=>'Sửa thành công','type'=>'success']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(DanhMuchinh $danhmuchinh)
    {
    	try {
    		$danhmuchinh->delete();
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
