<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\User;
use App\PasswordReset;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Support\Facades\Auth;
use Hash;

class ResetPasswordController extends Controller
{
	public function sendMail(Request $request)
	{
	
		$dem=User::where('email',$request->email)->count();
		if($dem==0){
			return back()->with(['thongbao'=>'Email này chưa được đăng ký tài khoản','type'=>'danger','error_reset'=>'loi']);
		}
		if($request->email)
		$user = User::where('email', $request->email)->firstOrFail();
		$passwordReset = PasswordReset::updateOrCreate([
			'email' => $user->email,
		], [
			'token' => Str::random(60),
		]);
		if ($passwordReset) {
			$user->sendPasswordResetNotification($passwordReset->token);
		}
		return back()->with(['thongbao'=>'Reset link đã được gửi tới Email của bạn','type'=>'success','error_reset'=>'loi']);
	}
	public function reset(Request $request,$token)
	{
		$request->validate([
			'password'=>'required|min:3|confirmed',
		]);
		$passwordReset = PasswordReset::where('token', $token)->firstOrFail();
		if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
			$passwordReset->delete();

			return back()->with(['thongbao'=>'Reset token không hợp lệ','type'=>'danger','error_reset'=>'loi']);
		}
		$user = User::where('email', $passwordReset->email)->firstOrFail();
		
		$updatePasswordUser=$user->update(['password'=>Hash::make($request->password)]);
		$passwordReset->delete();
		return redirect('trangchu');
	}
	public function showreset($token){
		return view('pages.showreset',compact('token'));
	}
}
