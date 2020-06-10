<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DanhMuc;
use Illuminate\Http\Response;
use DB;
class DanhMucController extends Controller
{

    public function index()
    {
        $query = '
        SELECT danh_mucs.*, PARENT."Ten" as "NameParent"
        FROM danh_mucs
        LEFT JOIN danh_mucs PARENT
        ON PARENT."id" = danh_mucs."idParent"
        ';
        $data = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Fetch Successfully',
            'data'=> $data
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function store(Request $request)
    {
        try {
            $item=DanhMuc::create($request->all());
            $query = '
            SELECT danh_mucs.*, PARENT."Ten" as "NameParent"
            FROM danh_mucs
            LEFT JOIN danh_mucs PARENT
            ON PARENT."id" = danh_mucs."idParent"
            WHERE danh_mucs."id" = '.$item['id'];
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
        $query = '
        SELECT danh_mucs.*, PARENT."Ten" as "NameParent"
        FROM danh_mucs
        LEFT JOIN danh_mucs PARENT
        ON PARENT."id" = danh_mucs."idParent"
        WHERE danh_mucs."id" = '.$id;
        $data_find = DB::select($query);
        $result = array(
            'status' => 'OK',
            'message'=> 'Insert Successfully',
            'data'=> $data_find[0]
        );
        return response()->json($result,Response::HTTP_OK,[],JSON_NUMERIC_CHECK);
    }
    //
    public function update(Request $request, $id)
    {
        try {
            $item=DanhMuc::find($id);
            $item->update($request->only('Ten','Hinh','idParent'));
            $query = '
            SELECT danh_mucs.*, PARENT."Ten" as "NameParent"
            FROM danh_mucs
            LEFT JOIN danh_mucs PARENT
            ON PARENT."id" = danh_mucs."idParent"
            WHERE danh_mucs."id" = '.$item['id'];
            $data_find = DB::select($query);
            $result = array(
                'status' => 'OK',
                'message'=> 'Update Successfully',
                'data'=> $data_find[0]
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
            DanhMuc::find($id)->delete();
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
