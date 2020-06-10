<?php
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class UserController extends Controller
{
    public function index()
    {
        $users=User::all();
        
        return response()->json($users, 200,[],JSON_NUMERIC_CHECK);
    }

    public function update(Request $request, $id)
    {
        $user=User::find($id);
        try {
            if($request->idDiaDiem!='null'){
                $user->update($request->only('idQuyen','Ten','DienThoai','DiaChi','Hinh','idDiaDiem','status'));
            }else{
                $user->update($request->only('idQuyen','Ten','DienThoai','DiaChi','Hinh','status'));
            }

        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json($user,200,[],JSON_NUMERIC_CHECK);
    }
    public function changehinh(Request $request, $id)
    {
        $user=User::find($id);
        $oldname=$user->Hinh?$user->Hinh:null;
        if($request->hasFile('Hinh'))
        {
            $file=$request->file('Hinh');
            $duoi=$file->getClientOriginalExtension();
            if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg')
            {
                return  response()->json('File khong dung dinh dang');
            }
            $disk = Storage::disk('gcs');
            $path=$disk->put('user', $file);
            if($oldname){
                $disk->delete('user/'.$oldname);
            }
            $name=Str::after($path, 'user/'); 
        }
        try {
            if($path){
                $user->Hinh=$name;
                $user->save();
            }
        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json($user,200,[],JSON_NUMERIC_CHECK);
    }


    public function doimatkhau(Request $request)
    {

        $user=User::find($request->id);
        if (Auth::attempt(['id' => $request->id, 'password' => $request->old_password]))
        {
            try {
                Auth::logout();
                $user->password=Hash::make($request->password);
                $user->save();
            } catch (Exception $e) {
                return response()->json(['error'=>true],200,[],JSON_NUMERIC_CHECK);
            }
            return response()->json(['user'=>$user],200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json(['error'=>true],200,[],JSON_NUMERIC_CHECK);
    }
}
