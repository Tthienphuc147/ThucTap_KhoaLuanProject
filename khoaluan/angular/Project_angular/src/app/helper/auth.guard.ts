import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.loginService.auth().pipe(
            map(res => {
                if (res['user']) {
                    this.loginService.updateUser(res['user']);
                    return true;
                }
                this.router.navigateByUrl('/login');
                return false;
            })
        );
    }
}
