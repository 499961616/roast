<?php

namespace App\Http\Controllers\API;

use App\Models\BrewMethod;
use App\Models\Cafe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BrewMethodsController extends Controller
{
    //

    /**
     * 获取所有冲泡方法以及拥有该冲泡方法的咖啡店数目
     * 请求API: /api/v1/brew-methods
     * 请求方法: GET
     */
    public function getBrewMethods()
    {
        $brewMethods = BrewMethod::withCount('cafes')->get();

        return response()->json($brewMethods);
    }
}
