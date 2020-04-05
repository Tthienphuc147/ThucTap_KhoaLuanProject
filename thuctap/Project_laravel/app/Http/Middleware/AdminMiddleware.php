<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{

    public function handle($request, Closure $next)
    {
        if(Auth::check()==0)
        {
            return redirect('trangchu');
        }
        if(auth()->user()->idQuyen>1)
        {
            return redirect('trangchu');
        }
        return $next($request);

    }
}