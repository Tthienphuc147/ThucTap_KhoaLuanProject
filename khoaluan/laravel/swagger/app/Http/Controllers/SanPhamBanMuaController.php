<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SanPhamBanMua;
use File;
class SanPhamBanMuaController extends Controller
{
	public function index()
	{

		return view('admin.sanpham.index');
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    	return view('admin.sanpham.create');
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
    		'idDanhMuc'=>'required',
    		'idNSX'=>'required',
    		'TenSanPham'=>'required|min:2|max:150|unique:san_pham_ban_muas',
    		'MoTa'=>'required',
    		'ThongTin'=>'required',
    		'Hinh'=>'required'
    	]);
    	
    	if($request->hasFile('Hinh'))
    	{
    		$file=$request->file('Hinh');
    		$duoi=$file->getClientOriginalExtension();
    		if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg')
    		{
    			return back()->with(['thongbao'=>'Bạn chỉ được chọn đuôi jpg png jpeg','type'=>'danger'])->withInput();
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
    		SanPhamBanMua::create($request->only('idDanhMuc','idNSX','TenSanPham','MoTa','ThongTin')+['Hinh'=>$Hinh]);
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger'])->withInput();
    	}
    	return back()->with(['thongbao'=>'Thêm thành công','type'=>'success'])->withInput();
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
    public function edit(SanPhamBanMua $sanpham)
    {

    	return view('admin.sanpham.edit',compact('sanpham'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SanPhamBanMua $sanpham)
    {
    	$request->validate([
    		'idDanhMuc'=>'required',
    		'idNSX'=>'required',
    		'TenSanPham'=>'required|min:2|max:150',
    		'MoTa'=>'required',
    		'ThongTin'=>'required',
    	]);
        if(SanPhamBanMua::where('TenSanPham',$request->TenSanPham)->where('id','!=',$sanpham->id)->count()>0){
            return back()->with(['thongbao'=>'Tên sản phẩm đã tồn tại !','type'=>'danger']);
        }
        $Hinh;
        $oldname=$sanpham->Hinh;
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
        else{
            try {
                $sanpham->update($request->all());
            } catch (Exception $e) {
                return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
            }
            return back()->with(['thongbao'=>'Sửa thành công','type'=>'success']);
        }
        try {
            $sanpham->update($request->only('idDanhMuc','idNSX','TenSanPham','MoTa','ThongTin')+['Hinh'=>$Hinh]);
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
    public function destroy(SanPhamBanMua $sanpham)
    {
    	try {
    		$sanpham->delete();
    	} catch (Exception $e) {
    		return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
    	}
    	return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
