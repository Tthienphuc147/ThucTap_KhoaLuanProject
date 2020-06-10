<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Validator;
class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|min:3|max:255',
            'password'=>'required|min:6'//,
            //'g-recaptcha-response' => ['required', new \App\Rules\ValidRecaptcha]
        ]);
        if ($validator->fails()) {
            return back()
            ->withErrors($validator)
            ->withInput()->with(['error_login'=>'Loi dang nhap']);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password],$request->remember))
        {
            return redirect()->intended('trangchu');
        }
        return back()->with(['thongbao'=>'User hoặc password không chính xác','type'=>'danger','error_login'=>'Loi dang nhap']);
    }
    public function logout(){
        Auth::logout();
        return redirect()->intended('trangchu');
    }
    
}
