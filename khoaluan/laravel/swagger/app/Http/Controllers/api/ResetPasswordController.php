<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\User;
use App\PasswordReset;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Support\Facades\Auth;
use Hash;
class ResetPasswordController extends Controller
{
	public function index()
	{
		$password_reset=PasswordReset::all();
		return response()->json($password_reset,200);
	}
	public function sendMail(Request $request)
	{
		$dem=User::where('email',$request->email)->count();
		if($dem==0){
			return response()->json(['error'=>true],200);
		}
		if($request->email){
			$user = User::where('email', $request->email)->firstOrFail();
			$passwordReset = PasswordReset::updateOrCreate([
				'email' => $user->email,
			], [
				'token' => Str::random(60),
			]);
		}
		if ($passwordReset) {
			$user->sendPasswordResetNotification($passwordReset->token);
		}
		return response()->json(['error'=>false],200);
	}
	public function reset_pass(Request $request)
	{
		$passwordReset = PasswordReset::where('token', $request->token)->firstOrFail();
		if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
			$passwordReset->delete();
			return response()->json(['error'=>true],200);
		}
		$user = User::where('email', $passwordReset->email)->firstOrFail();
		$updatePasswordUser=$user->update(['password'=>Hash::make($request->password)]);
		$passwordReset->delete();
		return response()->json(['error'=>false],200);
	}

	
}


