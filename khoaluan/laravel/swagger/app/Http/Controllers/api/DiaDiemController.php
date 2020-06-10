<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DiaDiem;
class DiaDiemController extends Controller
{
    public function index()
    {
        $data=DiaDiem::all();
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
    }

    public function store(Request $request)
    {
        try {
           $data= DiaDiem::create($request->all());
        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
    }

    public function update(Request $request, $id)
    {
        $data=DiaDiem::find($id);
        try {
            $data->update($request->only('Ten','idParent'));
        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json($data,200,[],JSON_NUMERIC_CHECK);
    }

    public function destroy($id)
    {
        try {
            DiaDiem::find($id)->delete();
        } catch (Exception $e) {
            return response()->json($e,200,[],JSON_NUMERIC_CHECK);
        }
        return response()->json(['error'=>false],200,[],JSON_NUMERIC_CHECK);
    }
}
