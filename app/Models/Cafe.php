<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Cafe extends Model
{
    public function brewMethods()
    {
        return $this->belongsToMany(BrewMethod::class, 'cafes_brew_methods', 'cafe_id', 'brew_method_id');
    }
// 关联分店
    public function children()
    {
        return $this->hasMany(Cafe::class,'parent','id');
    }
    // 归属总店
    public function parent()
    {
        return $this->hasMany(Cafe::class,'id','parent');
    }

    //与user 的多对多关联
    public function likes()
    {
        return $this->belongsToMany(User::class,'users_cafes_likes','cafe_id', 'user_id');
    }


}
