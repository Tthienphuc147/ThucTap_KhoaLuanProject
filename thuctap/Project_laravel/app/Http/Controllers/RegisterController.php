<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Hash;
use Validator;
use Exception;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|unique:users|email|min:3|max:255',
            'Ten'=>'required|min:3|max:255',
            'password'=>'required|confirmed|min:6'//,
           // 'g-recaptcha-response' => ['required', new \App\Rules\ValidRecaptcha]

        ]);
        if ($validator->fails()) {
            return back()
            ->withErrors($validator)
            ->withInput()->with(['error_register'=>'Loi dang ky']);
        }

        $user = new User;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save(); 
        Auth::login($user);
        return redirect()->back()->with(['flash' => 'success', 'thongbao' => 'Bạn đã đăng ký thành công !']);
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
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
   
        try {
            auth()->user()->update($request->all());
        } catch (Exception $e) {
            return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        return back()->with(['thongbao'=>'Thay đổi thông tin thành công','type'=>'success']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
