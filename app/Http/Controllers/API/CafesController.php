<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreCafeRequest;
use App\Models\Cafe;
use App\Utilities\GaodeMaps;
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

    public function postNewCafe(StoreCafeRequest  $request)
    {
        $cafe = new Cafe();

        $cafe->name    = $request->input('name');
        $cafe->address  = $request->input('address');
        $cafe->city     = $request->input('city');
        $cafe->state    = $request->input('state');
        $cafe->zip      = $request->input('zip');

        $coordinates = GaodeMaps::geocodeAddress($cafe->address,$cafe->city,$cafe->state);

        $cafe->latitude = $coordinates['lat'];
        $cafe->longitude = $coordinates['lng'];
        $cafe->save();

        return response()->json($cafe,201);
    }
}
