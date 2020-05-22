import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ThongbaoService } from './thongbao.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    private subscriptions: Subscription[] = [];
    private subSubject: BehaviorSubject<Subscription[]>;
    public subObser: Observable<Subscription[]>;
    constructor(
        public http: HttpClient,
        private thongbaoService: ThongbaoService
    ) {
        this.subSubject = new BehaviorSubject<Subscription[]>(
            this.subscriptions
        );
        this.subObser = this.subSubject.asObservable();
    }

    set_subSubject(value: Subscription): void {
        this.subSubject.value.push(value);
        this.subSubject.next(this.subSubject.value);
    }
}
