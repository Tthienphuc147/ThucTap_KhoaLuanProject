import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Password_reset } from '../models/password_reset';
import { User } from '../models/user';
import { ThongbaoService } from './thongbao.service';

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {
    password_resets: Password_reset[] = [];
    public prSubject: BehaviorSubject<Password_reset[]>;
    public currentPR: Observable<Password_reset[]>;
    public API: string = environment.api_url + '/api/password_reset';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.prSubject = new BehaviorSubject<Password_reset[]>(
            this.password_resets
        );
        this.currentPR = this.prSubject.asObservable();
        this.getAll();
    }
    set_subject(data) {
        this.prSubject.next(data);
    }
    getAll() {
        return this.http.get<Password_reset[]>(this.API).subscribe(res => {
            this.prSubject.next(res);
        });
    }
    reset(formdata): Observable<User> {
        const url = this.API + '/reset';
        return this.http.post<User>(url, formdata).pipe(
            map(
                data => {
                    return data;
                },
                err => {}
            )
        );
    }
}
