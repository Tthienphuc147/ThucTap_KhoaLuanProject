import { LoginService } from './../services/login.service';
import { Injectable, OnDestroy } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { CartService } from '../services/cart.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartGuard implements CanActivate, OnDestroy {
    subscriptions: Subscription[] = [];
    constructor(private router: Router, private cartService: CartService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.cartService.currentTotal.pipe(
            map(data => {
                const count: number = this.cartService.getCurrentCount();
                if (count > 0 && data > 0) {
                    return true;
                }
                this.router.navigate(['/']);
                return false;
            })
        );
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
}
