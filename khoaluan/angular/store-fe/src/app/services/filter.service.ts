import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sanpham } from '../models/sanpham';
import { ThongbaoService } from './thongbao.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    sanphams: Sanpham[] = [];
    private filterSubject: BehaviorSubject<Sanpham[]>;
    public currentFilter: Observable<Sanpham[]>;
    constructor(private thongbaoService: ThongbaoService) {
        this.filterSubject = new BehaviorSubject<Sanpham[]>(this.sanphams);
        this.currentFilter = this.filterSubject.asObservable();
    }
    getFilter(iddanhmuc: number) {}
    setFilter(items: Sanpham[]) {
        this.filterSubject.next(items.slice());
    }
}
