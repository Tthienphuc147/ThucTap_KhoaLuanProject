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
export class TinTucService extends BaseService{
    private API: string = environment.api_url;


    constructor(
        public http: HttpClient,
        public thongbaoService: ThongbaoService,
        private loadingService: LoadingService
    ) {
        super(http);
    }

    getAllTinTuc(): Observable<any> {
        const url = `${this.API}/api/listtintuc`;
        return this.http.get(url);
    }
    getTinTuc(id: string): Observable<any> {
        const url = `${this.API}/api/chitiettintuc/${id}`;
        return this.http.get(url);
    }
    getTinTucTheoLoai(id: string): Observable<any> {
        const url = `${this.API}/api/loaitintuclienquan/${id}`;
        return this.http.get(url);
    }

}
