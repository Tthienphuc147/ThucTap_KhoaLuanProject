<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\NhaCungCap;
use Illuminate\Http\Response;

class NhaCungCapController extends Controller
{
    public function index()
    {
        $items = NhaCungCap::all();
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
            $item=NhaCungCap::create($request->all());
            $data_find = NhaCungCap::find($item['id']);
            $result = array(
                'status' => 'OK',
                'message'=> 'Insert Successfully',
                'data'=> $data_find
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
        $data_find=NhaCungCap::find($id);
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
            $data_find=NhaCungCap::find($id);
            $data_find->update($request->only('Ten'));
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
            nhacungcap::find($id)->delete();
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
