<?php

namespace App\Http\Middleware;

use Closure;
use Cart;

class CartMiddleware
{

    public function handle($request, Closure $next)
    {
        if(Cart::count()==0){
            return redirect('trangchu');
        }
        return $next($request);
    }
}
