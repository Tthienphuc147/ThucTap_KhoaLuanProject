<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DanhMucHinh;
use File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use DB;

class DanhMucHinhController extends Controller
{
    public function index()
    {
        $query = '
        SELECT danh_muc_hinhs.*, san_pham_ban_muas."TenSanPham"
        FROM danh_muc_hinhs
        LEFT JOIN san_pham_ban_muas
        ON danh_muc_hinhs."idSanPham" = san_pham_ban_muas."id"
        ';
        $items = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $items
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function store(Request $request)
    {
        try {
            $item;
            if($request->hasFile('Hinh'))
            {
                $file=$request->file('Hinh');
                $duoi=$file->getClientOriginalExtension();
                if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg')
                {   
                    $result = array(
                        'status' => 'ER',
                        'message'=> 'File Format is not support',
                        'data'=> ''
                    );
                    return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
                }
                $disk = Storage::disk('gcs');
                $path=$disk->put('sanpham', $file);
                $name=Str::after($path, 'sanpham/');
            }
            if($path){
                $item=DanhMucHinh::create($request->only('idSanPham')+['Hinh'=>$name]);
            }
            $query = '
            SELECT danh_muc_hinhs.*, san_pham_ban_muas."TenSanPham"
            FROM danh_muc_hinhs
            LEFT JOIN san_pham_ban_muas
            ON danh_muc_hinhs."idSanPham" = san_pham_ban_muas."id"
            WHERE danh_muc_hinhs."id" = '.$item['id'];
            $data_find = DB::select($query);
            $result = array(
                'status' => 'OK',
                'message'=> 'Insert Successfully',
                'data'=> $data_find[0]
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Insert Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }

    }
    //
    public function show($id)
    {
        $data_find=DanhMucHinh::find($id);
        $result = array(
            'status' => 'OK',
            'message'=> 'Insert Successfully',
            'data'=> $data_find
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function update(Request $request, $id)
    {
        try {
            $item=DanhMucHinh::find($id);
            $Hinh;
            $oldname=$item->Hinh;
            if($request->hasFile('Hinh'))
            {
                $file=$request->file('Hinh');
                $duoi=$file->getClientOriginalExtension();
                if($duoi != 'jpg' && $duoi !='png' && $duoi != 'jpeg')
                {
                    $result = array(
                        'status' => 'ER',
                        'message'=> 'File Format is not support',
                        'data'=> ''
                    );
                    return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
                }
                $disk = Storage::disk('gcs');
                $disk->delete('sanpham/'.$oldname);
                $path=$disk->put('sanpham', $file);
                $name=Str::after($path, 'sanpham/');
                if($path){
                    $item->update($request->only('idSanPham')+['Hinh'=>$name]);
                }
            }
            else{
                $item->update($request->all());
            }
            $data_find=DanhMucHinh::find($id);
            $result = array(
                'status' => 'OK',
                'message'=> 'Update Successfully',
                'data'=> $data_find
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Update Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
    }
    //
    public function destroy($id)
    {
        try {
            DanhMucHinh::find($id)->delete();
            $result = array(
                'status' => 'OK',
                'message'=> 'Delete Successfully',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
        } catch (Exception $e) {
            $result = array(
                'status' => 'ER',
                'message'=> 'Delete Failed',
                'data'=> ''
            );
            return response()->json($result,Response::HTTP_BAD_REQUEST,[],JSON_NUMERIC_CHECK);
        }
    }
}
