import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';
import { ThongbaoService } from './thongbao.service';
import { LoadingService } from './loading.service';
import { BaseService } from './base-service';

@Injectable({
    providedIn: 'root'
})
export class DichVuService extends BaseService{
    private API: string = environment.api_url;


    constructor(
        public http: HttpClient,
        public thongbaoService: ThongbaoService,
        private loadingService: LoadingService
    ) {
        super(http);
    }

    getAllDichVu(): Observable<any> {
        const url = `${this.API}/api/listdichvu`;
        return this.http.get(url);
    }
    getDichVu(id: string): Observable<any> {
        const url = `${this.API}/api/chitietdichvu/${id}`;
        return this.http.get(url);
    }
    getDichVuTheoLoai(id: string): Observable<any> {
        const url = `${this.API}/api/loaidichvulienquan/${id}`;
        return this.http.get(url);
    }

}
