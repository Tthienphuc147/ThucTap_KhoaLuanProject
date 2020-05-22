import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HoadonxuatService } from './hoadonxuat.service';
import { ChitiethoadonxuatService } from './chitiethoadonxuat.service';

@Injectable({
    providedIn: 'root'
})
export class ThanhtoanService {
    API = environment.api_url + '/api';
    constructor(public http: HttpClient) {}
    submitOrder(formData): Observable<any> {
        return this.http.post<any>(`${this.API}/submit-order`, formData);
    }
}
