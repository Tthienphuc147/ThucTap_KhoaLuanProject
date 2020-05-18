import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DanhMuc } from 'src/app/models/danhmuc';
import { Sanpham } from 'src/app/models/sanpham';
import { Subscription } from 'rxjs';
import { SanphamService } from 'src/app/services/sanpham.service';
import { DanhmucService } from 'src/app/services/danhmuc.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/services/mobile.service';
import { ChiTietHoaDonNhap } from 'src/app/models/chitiethoadonnhap';
import { Cart } from 'src/app/models/cart';
import { HomePageService } from 'src/app/services/home-page.service';
import { Product } from '../../../models/Product';
import { LoadingService } from '../../../services/loading.service';

@Component({
    selector: 'app-block-danh-muc',
    templateUrl: './block-danh-muc.component.html',
    styleUrls: ['./block-danh-muc.component.css']
})
export class BlockDanhMucComponent implements OnInit, OnDestroy {
    matches = true;
    api_url = environment.api_storage;
    @Input() idblock: any;
    @Input() idbaner: number;
    mysubdanhmuc: number[] = [];
    danhmucs: DanhMuc[] = [];
    sanphams: Sanpham[] = [];
    products: Product[] = [];
    subscriptions: Subscription[] = [];
    isloaded = false;
    is_loading = true;
    loading = false;
    constructor(
        private danhmucService: DanhmucService,
        private cartService: CartService,
        private dataService: DataService,
        private router: Router,
        private mobileService: MobileService,
        private homepageService: HomePageService,
        private loadingService: LoadingService
    ) {}
    ngOnInit() {
        this.is_loading = true;
        this.loadData();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    onClickDanhMuc(e) {
        this.router.navigate(['/search'], { queryParams: { cat: e.id } });
    }
    loadData() {
        this.subscriptions.push(
            this.loadingService.LoadingObs.subscribe(
                data => (this.loading = data)
            ),
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                    this.getallsub_danhmuc(this.idblock.id);
                },
                err => {}
            ),
            this.dataService.currentIsLoaded.subscribe(data => {
                this.isloaded = data;
            }),
            this.mobileService.mobileObs.subscribe(data => {
                this.matches = data;
            }),
            this.homepageService.ProductObs.subscribe(data => {
                if (data.length > 0) {
                    this.products = data
                        .filter(e => {
                            return this.mysubdanhmuc.includes(e.idDanhMuc);
                        })
                        .slice(0, 8);
                    this.is_loading = false;
                }
            })
        );
    }
    getsub_danhmuc(iddanhmuc: number) {
        return this.danhmucs.filter(e => {
            return e.idParent === iddanhmuc;
        });
    }
    dequy(idParent: number) {
        if (this.getsub_danhmuc(idParent).length > 0) {
            this.getsub_danhmuc(idParent).forEach(e => {
                this.dequy(e.id);
            });
        } else {
            this.mysubdanhmuc.push(idParent);
        }
    }
    getallsub_danhmuc(iddanhmuc: number) {
        this.dequy(iddanhmuc);
    }
    onAddCart(sp) {
        this.cartService.addCart(new Cart(sp.id, 1));
    }
}
