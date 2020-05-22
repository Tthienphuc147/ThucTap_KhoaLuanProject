import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';
import { ThongbaoService } from './thongbao.service';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class HomePageService {
    private API: string = environment.api_url + '/api/home';
    private products: Product[] = [];
    public ProductSub: BehaviorSubject<Product[]>;
    public ProductObs: Observable<Product[]>;
    public TopSellProductSub: BehaviorSubject<Product[]>;
    public TopSellProductObs: Observable<Product[]>;

    constructor(
        public http: HttpClient,
        public thongbaoService: ThongbaoService,
        private loadingService: LoadingService
    ) {
        this.ProductSub = new BehaviorSubject<Product[]>(this.products);
        this.ProductObs = this.ProductSub.asObservable();
        this.TopSellProductSub = new BehaviorSubject<Product[]>([]);
        this.TopSellProductObs = this.TopSellProductSub.asObservable();
    }
    FetchProduct() {
        if (this.ProductSub.value.length === 0) {
            this.loadingService.LoadingSub.next(true);
        }
        this.http.get<Product[]>(this.API).subscribe(
            res => {
                this.ProductSub.next(res.slice());
            },
            err => {},
            () => this.loadingService.LoadingSub.next(false)
        );
    }
    GetTopSell() {
        if (this.ProductSub.value.length === 0) {
            this.loadingService.LoadingSub.next(true);
        }
        this.http
            .get<Product[]>(environment.api_url + '/api/get-hot-sell')
            .subscribe(
                res => {
                    this.TopSellProductSub.next(res);
                },
                err => {},
                () => this.loadingService.LoadingSub.next(false)
            );
    }
    ReferProduct(idSanPham) {
        if (this.ProductSub.value) {
            return this.ProductSub.value.filter(e => {
                return e.id === idSanPham;
            })[0];
        } else {
            return null;
        }
    }
}
