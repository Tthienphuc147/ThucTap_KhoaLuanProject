import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChiTietKhuyenMai } from '../models/chitietkhuyenmai';
import { ThongbaoService } from './thongbao.service';

@Injectable({
    providedIn: 'root'
})
export class ChitietkhuyenmaiService {
    public itemsSub: BehaviorSubject<any[]>;
    public itemsObs: Observable<any[]>;
    public itemsDetailSub: BehaviorSubject<any[]>;
    public itemsDetailObs: Observable<any[]>;
    public isLoadingSub: BehaviorSubject<boolean>;
    public isLoadingObs: Observable<boolean>;
    public itemSub: BehaviorSubject<any>;
    public itemObs: Observable<any>;
    private API: string = environment.api_url + '/api/chitietkhuyenmai';
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.itemsSub = new BehaviorSubject<any[]>([]);
        this.itemsObs = this.itemsSub.asObservable();
        this.itemsDetailSub = new BehaviorSubject<any[]>([]);
        this.itemsDetailObs = this.itemsDetailSub.asObservable();
        this.itemSub = new BehaviorSubject<any>(null);
        this.itemObs = this.itemSub.asObservable();
        this.isLoadingSub = new BehaviorSubject<boolean>(false);
        this.isLoadingObs = this.isLoadingSub.asObservable();
    }
    findIndex(array, id: number) {
        return array.findIndex(e => e.id === id);
    }
    referById(id: number) {
        const url = `${this.API}/${id}`;
        this.http.get<any>(url);
    }
    getAll() {
        this.isLoadingSub.next(true);
        return this.http.get<any[]>(this.API).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.next(res['data']);
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }

    getChiTietKhuyenMai() :Observable<any> {
        const url = `${this.API}`;
        return this.http.get(url);
    }
    createNew(values: FormData) {
        this.isLoadingSub.next(true);
        this.http.post<any>(this.API, values).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    this.itemsSub.value.push(res['data']);
                    this.itemsSub.next(this.itemsSub.value);
                    this.itemsDetailSub.value.push(res['data']);
                    this.itemsDetailSub.next(this.itemsDetailSub.value);
                    this.thongbaoService.open('Thêm thành công!', 'bg-success');
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    delete(value) {
        const url = `${this.API}/${value.id}`;
        this.isLoadingSub.next(true);
        this.http.delete(url).subscribe(
            data => {
                if (data['status'] === 'OK') {
                    const index = this.findIndex(
                        this.itemsDetailSub.value,
                        value.id
                    );
                    if (index !== -1) {
                        this.itemsDetailSub.value.splice(index, 1);
                        this.itemsDetailSub.next(this.itemsDetailSub.value);
                        this.thongbaoService.open(
                            'Xóa thành công: ' + value.id + ' !',
                            'bg-success'
                        );
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    update(value) {
        value.append('_method', 'put');
        const url = `${this.API}/${value.get('id')}`;
        this.isLoadingSub.next(true);
        this.http.post<any>(url, value).subscribe(
            res => {
                if (res['status'] === 'OK') {
                    const index = this.findIndex(
                        this.itemsDetailSub.value,
                        Number.parseInt(value.get('id') + '')
                    );
                    if (index !== -1) {
                        this.itemsDetailSub.value[index] = res['data'];
                        this.itemsDetailSub.next(this.itemsDetailSub.value);
                        this.thongbaoService.open(
                            'Cập nhật thành công!',
                            'bg-success'
                        );
                    }
                }
            },
            () => {},
            () => this.isLoadingSub.next(false)
        );
    }
    referDetailById(id) {
        const formData = new FormData();
        formData.append('idKhuyenMai', id);
        this.http
            .post<any>(
                environment.api_url + '/api/khuyenmai-refer-detail',
                formData
            )
            .subscribe(
                res => {
                    if (res['status'] === 'OK') {
                        this.itemsDetailSub.next(res['data']);
                    }
                },
                () => {},
                () => this.isLoadingSub.next(false)
            );
    }
}
