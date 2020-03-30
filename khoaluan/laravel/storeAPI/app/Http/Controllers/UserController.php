<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Hash;
use App\User;
use File;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function postLogin(){

    }
    public function index()
    {
        return view('admin.user.index');
    }

    public function create()
    {
        return view('admin.user.create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'email'=>'required',
            'password'=>'required|min:6|max:200'
        ]);
        $Hinh='';
        $pass=Hash::make($request->password);
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
            while(file_exists("upload/user/".$Hinh))
            {
                $Hinh= str_random(4)."_".$name;
            }
            $file->move("upload/user",$Hinh);
        }
        try {
            $user=User::create($request->only('email','Ten','DienThoai','DiaChi','idDiaDiem','idQuyen')+['Hinh'=>$Hinh,'password'=>$pass]);
        } catch (Exception $e) {
            return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        return back()->with(['thongbao'=>'Thêm thành công','type'=>'success','hold'=>$request->idSanPham]);
        
    }


    public function show($id)
    {
        //
    }

    public function edit(User $user)
    {
        return view('admin.user.edit',compact('user'));
    }


    public function update(Request $request,User $user)
    {

        $request->validate([
            'email'=>'required',
            'password'=>'required|min:6|max:200'
        ]);
        $oldname=user()->Hinh;
        $Hinh='';
        $pass='';
        if ($user->password== $request->password) {

            $pass=$request->password;
        }
        else{
            $pass=Hash::make($request->password);
        }
        
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
            while(file_exists("upload/user/".$Hinh))
            {
                $Hinh= str_random(4)."_".$name;
            }
            $file->move("upload/user",$Hinh);
            try {
                $user->update($request->only('email','Ten','DienThoai','DiaChi','idDiaDiem','idQuyen')+['Hinh'=>$Hinh,'password'=>$pass]);
            } catch (Exception $e) {
                return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
            }
            if(File::exists("upload/user/".$oldname))
            {
                File::delete("upload/user/".$oldname);
            }
        }
        else{
            try {
                $user->update($request->only('email','Ten','DienThoai','DiaChi','idDiaDiem','idQuyen')+['password'=>$pass]);
            } catch (Exception $e) {
                return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
            }
        }

        return back()->with(['thongbao'=>'Sửa thành công','type'=>'success','hold'=>$request->id]);
    }


    public function destroy(User $user)
    {
        try {
            $user->delete();
        } catch (Exception $e) {
            return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
    public function change_password(Request $request){
        $request->validate([
            'old_pass'=>'required',
            'new_pass'=>'required|min:6|max:200|confirmed:re_pass',
        ]);
        if (Hash::check($request->old_pass,auth()->user()->password)) {
            try {
                auth()->user()->update(['password'=>Hash::make($request->new_pass)]);
            } catch (Exception $e) {
                return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
            }
        }
        else{
            return back()->with(['thongbao'=>'Sai mật khẩu','type'=>'danger']);
        }
        return back()->with(['thongbao'=>'Đổi mật khẩu thành công','type'=>'success']);
        
        
    }
    public function upload_img_profile(Request $request){

        $oldname=auth()->user()->Hinh;
        $Hinh=auth()->user()->Hinh;
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
            while(file_exists("upload/user/".$Hinh))
            {
                $Hinh= str_random(4)."_".$name;
            }
            $file->move("upload/user",$Hinh);

        }
        try {
            auth()->user()->update(['Hinh'=>$Hinh]);
        } catch (Exception $e) {
            return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        if(File::exists("upload/user/".$oldname))
        {
            File::delete("upload/user/".$oldname);
        }
        return back()->with(['thongbao'=>"Cập nhật hình đại diện thành công",'type'=>'success']);
    }
}
