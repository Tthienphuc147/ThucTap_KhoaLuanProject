<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Response;
use App\User;

class AuthController extends Controller
{
	public static $ER = 'invalid.credentials';
	public static $MSG = 'Invalid Credentials.';
	public static $STA = 'ERROR';

	public function register(RegisterFormRequest $request)
	{
		$params = $request->only('email', 'name', 'password');
		$user = new User();
		$user->email = $params['email'];
		$user->name = $params['name'];
		$user->password = bcrypt($params['password']);
		$user->save();

		return response()->json($user, Response::HTTP_OK);
	}

	public function login(Request $request)
	{
		$credentials = $request->only('email', 'password');
		if (!($token = JWTAuth::attempt($credentials))) {
			return response()->json([
				'status' => self::$STA,
				'error' => self::$ER,
				'msg' => self::$MSG
			], Response::HTTP_BAD_REQUEST);
		}
		$user = Auth::user();
		return response()->json(['token' => $token, 'user' => $user], Response::HTTP_OK);
	}

	public function user(Request $request)
	{
		$user = Auth::user();

		if ($user) {
			return response(['user'=>$user], Response::HTTP_OK);
		}

		return response(null, Response::HTTP_BAD_REQUEST);
	}

    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
    	$this->validate($request, ['token' => 'required']);
    	try {
    		JWTAuth::invalidate($request->input('token'));
    		return response()->json('You have successfully logged out.', Response::HTTP_OK);
    	} catch (JWTException $e) {
    		return response()->json('Failed to logout, please try again.', Response::HTTP_BAD_REQUEST);
    	}
    }

    public function refresh()
    {
    	return response(JWTAuth::getToken(), Response::HTTP_OK);
    }
}
