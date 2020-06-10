<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class NhanVienMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check()==0)
        {
            return redirect('trangchu');
        }
        if(auth()->user()->idQuyen>2)
        {
            return redirect('trangchu');
        }
        return $next($request);
    }
}
