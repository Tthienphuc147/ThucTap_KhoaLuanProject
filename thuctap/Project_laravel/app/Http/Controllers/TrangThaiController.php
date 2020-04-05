<?php

namespace App\Http\Controllers;

use App\TrangThai;
use Illuminate\Http\Request;

class TrangThaiController extends Controller
{
    public function index()
    {

        return view('admin.trangthai.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.trangthai.create');
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
            TrangThai::create($request->all());
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
    public function edit(TrangThai $trangthai)
    {

        return view('admin.trangthai.edit',compact('trangthai'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TrangThai $trangthai)
    {
        $request->validate([
            'Ten'=>'required|min:2|max:100',
        ]);
        try {
            $trangthai->update($request->all());
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
    public function destroy(TrangThai $trangthai)
    {
        try {
            $trangthai->delete();
        } catch (Exception $e) {
            return back()->with(['thongbao'=>$e->getMessage(),'type'=>'danger']);
        }
        return back()->with(['thongbao'=>'Xóa thành công','type'=>'success']);
    }
}
