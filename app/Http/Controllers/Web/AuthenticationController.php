<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthenticationController extends Controller
{
    public function getSocialRedirect($account)
    {
        try {
            return Socialite::driver($account)->redirect();

        }catch (\InvalidArgumentException $e){
            return redirect('/#/home');
        }

    }

    public function getSocialCallback($account)
    {
        $socialUser = Socialite::driver($account)->user();

        $user = User::where( 'provider_id', '=', $socialUser->id )
            ->where( 'provider', '=', $account )
            ->first();

        if ($user ==null){
            $newUser = new User();

            $newUser->name        = $socialUser->getNickName();
            $newUser->email       = $socialUser->getEmail() == '' ? '' : $socialUser->getEmail();
            $newUser->avatar      = $socialUser->getAvatar();
            $newUser->password    = '';
            $newUser->provider    = $account;
            $newUser->provider_id = $socialUser->getId();

            $newUser->save();
            $user = $newUser;
        }
        Auth::login($user);

        return redirect('/');
    }
}
