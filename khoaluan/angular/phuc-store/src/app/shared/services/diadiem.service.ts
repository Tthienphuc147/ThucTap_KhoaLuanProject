import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DiaDiem } from './../models/diadiem';
import { ThongbaoService } from './thongbao.service';

@Injectable({
    providedIn: 'root'
})
export class DiadiemService {
    title = 'DiaDiem';
    DiaDiems: DiaDiem[] = [];
    public DiaDiemSubject: BehaviorSubject<DiaDiem[]>;
    public currentDiaDiem: Observable<DiaDiem[]>;
    public API: string = environment.api_url + '/api/diadiem';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.DiaDiemSubject = new BehaviorSubject<DiaDiem[]>(this.DiaDiems);
        this.currentDiaDiem = this.DiaDiemSubject.asObservable();
        this.getAll();
    }
    getOne(id: number): Observable<DiaDiem> {
        const url = `${this.API}/${id}`;
        return this.http.get<DiaDiem>(url);
    }
    getAll() {
        return this.http
            .get<DiaDiem[]>(this.API)
            .subscribe(res => this.DiaDiemSubject.next(res));
    }
    createNew(diadiem: any): Observable<DiaDiem> {
        return this.http.post<DiaDiem>(this.API, diadiem).pipe(
            map(data => {
                this.DiaDiemSubject.value.push(data);
                this.DiaDiemSubject.next(this.DiaDiemSubject.value);
                this.thongbaoService.open('Thêm thành công!', 'bg-success');
                return data;
            })
        );
    }
    delete(diadiem: DiaDiem): Observable<any> {
        const url = `${this.API}/${diadiem.id}`;
        return this.http.delete(url).pipe(
            map(data => {
                this.DiaDiemSubject.value.forEach((e, index) => {
                    if (e.id === diadiem.id) {
                        this.DiaDiemSubject.value.splice(index, 1);
                        this.DiaDiemSubject.next(this.DiaDiemSubject.value);
                        return false;
                    }
                });
                this.thongbaoService.open(
                    'Xóa thành công: ' + diadiem.id + ' !',
                    'bg-success'
                );
                return data;
            })
        );
    }
    update(formdata: FormData): Observable<DiaDiem> {
        const url = `${this.API}/${formdata.get('id')}`;
        return this.http.post<DiaDiem>(url, formdata).pipe(
            map(data => {
                this.DiaDiemSubject.value.map(e => {
                    if (e.id === data.id) {
                        e.Ten = data.Ten;
                        e.idParent = data.idParent;
                        e.updated_at = data.updated_at;
                    }
                    return e;
                });
                this.DiaDiemSubject.next(this.DiaDiemSubject.value);
                this.thongbaoService.open('Cập nhật thành công!', 'bg-success');
                return data;
            })
        );
    }
    getDiaDiem_by_id(id: number) {
        return this.DiaDiemSubject.value
            .filter(data => {
                return data.id === id;
            })
            .slice()[0];
    }
    getThanhPhos() {
        return this.DiaDiemSubject.value.filter(e => {
            return e.idParent == null;
        });
    }
    getParent(child: DiaDiem): DiaDiem {
        return this.DiaDiemSubject.value.filter(e => {
            return e.id === child.idParent;
        })[0];
    }
    getDongCap(item: DiaDiem): DiaDiem[] {
        if (!item) {
            return null;
        }
        return this.DiaDiemSubject.value.filter(e => {
            return e.idParent === item.idParent;
        });
    }

    onChangeThanhPho(id: number) {
        return this.DiaDiemSubject.value
            .filter(data => {
                return data.idParent === id;
            })
            .slice();
    }
    onChangeQuan(id: number) {
        return this.DiaDiemSubject.value
            .filter(data => {
                return data.idParent === id;
            })
            .slice();
    }
    getDiaChi(id: number) {
        const phuong = this.DiaDiemSubject.value.slice().filter(e => {
            return e.id === id;
        })[0];
        const quan = this.DiaDiemSubject.value.slice().filter(e => {
            return e.id === phuong.idParent;
        })[0];
        const thanhpho = this.DiaDiemSubject.value.filter(e => {
            return e.id === quan.idParent;
        })[0];
        if (phuong && quan && thanhpho) {
            return phuong.Ten + ', ' + quan.Ten + ', ' + thanhpho.Ten;
        }
        return null;
    }
}
