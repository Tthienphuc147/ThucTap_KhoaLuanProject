import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public API: string = environment.api_url + '/api';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private router: Router
    ) {
        const token =
            localStorage.getItem('token') !== 'undefined'
                ? localStorage.getItem('token')
                : null;
        if (token) {
            this.auth().subscribe(
                res => {
                    if (res['user']) {
                        this.updateUser(res['user']);
                    } else {
                    }
                },
                err => {}
            );
        }
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();

        if (this.currentUserValue) {
            this.userService.currentUser.subscribe(data => {
                const value = data.filter(e => {
                    return e.id === this.currentUserValue.id;
                })[0];
                if (value) {
                    this.updateUser(value);
                }
            });
        }
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    auth(): Observable<any[]> {
        const url = `${this.API}/auth`;
        return this.http.get<any>(url);
    }
    login(data) {
        const url = `${this.API}/login`;
        // const url = `${this.API}/authenticate`;
        return this.http.post<any>(url, data).pipe(
            map(
                res => {
                    if (res['token'] && res['user']) {
                        localStorage.setItem('token', res['token']);
                        this.updateUser(res['user']);
                    }
                    return res;
                },
                err => {}
            )
        );
    }
    updateUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
    logout() {
        const url = `${this.API}/logout`;
        const token =
            localStorage.getItem('token') !== 'undefined'
                ? localStorage.getItem('token')
                : null;
        if (token) {
            const formData = new FormData();
            formData.append('token', token);
            this.http.post<any>(url, formData).subscribe(res => {});
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
            this.router.navigateByUrl('/');
        }
    }
    register(data) {
        const url = `${this.API}/register`;
        return this.http.post<any>(url, data).pipe(
            map(
                user => {
                    if (
                        user['error'] === true ||
                        user['error_email'] === true
                    ) {
                    } else {
                        this.userService.pushUserSubject(user.user);
                    }
                    return user;
                },
                err => {}
            )
        );
    }
    reset_password(formdata: FormData) {
        const url = `${this.API}/reset_password`;
        return this.http.post<any>(url, formdata).pipe(
            map(
                data => {
                    return data;
                },
                err => {}
            )
        );
    }
    doimatkhau(formdata): Observable<User> {
        const url = `${this.API}/profile/doimatkhau`;
        return this.http.post<User>(url, formdata).pipe(
            map(
                data => {
                    if (data['user']) {
                        this.updateUser(data['user']);
                    }
                    return data;
                },
                err => {}
            )
        );
    }
}
