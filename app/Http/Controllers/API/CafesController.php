<?php

namespace App\Http\Controllers\Api;

use App\Models\Cafe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CafesController extends Controller
{
    public function getCafes()
    {
        $cafes = Cafe::all();
        return response()->json($cafes);
    }

    public function getCafe($id)
    {
        $cafe = Cafe::where('id','=',$id)->first();
        return response()->json($cafe);
    }

    public function postNewCafe(Request  $request)
    {
        $cafe = new Cafe();

        $cafe->name    = $request->get('name');
        $cafe->address  = $request->get('address');
        $cafe->city     = $request->get('city');
        $cafe->state    = $request->get('state');
        $cafe->zip      = $request->get('zip');

        $cafe->save();

        return response()->json($cafe,201);
    }
}
