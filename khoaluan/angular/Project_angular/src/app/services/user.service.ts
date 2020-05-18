import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ThongbaoService } from './thongbao.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.userSubject = new BehaviorSubject<User[]>(this.users);
        this.currentUser = this.userSubject.asObservable();
        //this.getAll();
    }
    users: User[] = [];
    public userSubject: BehaviorSubject<User[]>;
    public currentUser: Observable<User[]>;
    public API: string = environment.api_url + '/api/user';
    getCountUser() {
        return this.userSubject.value.length;
    }
    pushUserSubject(data: User) {
        this.userSubject.value.push(data);
    }
    referById(id) {
        const url = `${this.API}/${id}`;
        return this.http.get<User>(url);
    }
    getAll() {
        return this.http.get<User[]>(this.API).subscribe(res => {
            this.userSubject.next(res);
        });
    }
    getOne(id: number): Observable<User> {
        const url = `${this.API}/${id}`;
        return this.http.get<User>(url);
    }
    createNew(user: any): Observable<User> {
        return this.http.post<User>(this.API, user);
    }
    delete(user: User): Observable<any> {
        const url = `${this.API}/${user.id}`;
        return this.http.delete(url);
    }
    update_hinh(formdata: FormData) {
        const url = `${this.API}/${formdata.get('id')}/changehinh`;
        return this.http.post<User>(url, formdata).pipe(
            map(data => {
                this.userSubject.value.map(e => {
                    if (e.id === data.id) {
                        e.Ten = data.Ten;
                        e.DienThoai = data.DienThoai;
                        e.DiaChi = data.DiaChi;
                        e.idQuyen = Number.parseInt(data.idQuyen + '');
                        e.idDiaDiem = Number.parseInt(data.idDiaDiem + '');
                        e.Hinh = data.Hinh;
                        e.status = data.status;
                        e.updated_at = data.updated_at;
                    }
                    return e;
                });
                this.userSubject.next(this.userSubject.value);
                this.thongbaoService.open(
                    'Cập nhật thành công ảnh đại diện!',
                    'bg-success'
                );
                return data;
            })
        );
    }
    update(formdata: FormData): Observable<User> {
        const url = `${this.API}/${formdata.get('id')}`;
        return this.http.post<User>(url, formdata).pipe(
            map(data => {
                this.userSubject.value.map(e => {
                    if (e.id === data.id) {
                        e.Ten = data.Ten;
                        e.DienThoai = data.DienThoai;
                        e.DiaChi = data.DiaChi;
                        e.idQuyen = Number.parseInt(data.idQuyen + '');
                        e.idDiaDiem = Number.parseInt(data.idDiaDiem + '');
                        e.Hinh = data.Hinh;
                        e.status = data.status;
                        e.updated_at = data.updated_at;
                    }
                    return e;
                });
                this.userSubject.next(this.userSubject.value);
                this.thongbaoService.open('Cập nhật thành công!', 'bg-success');
                return data;
            })
        );
    }
}
