import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { HomePageService } from 'src/app/services/home-page.service';
import { environment } from '../../../environments/environment';
import { Cart } from '../../models/cart';
import { ChiTietHoaDonNhap } from '../../models/chitiethoadonnhap';
import { ChiTietHoaDonXuat } from '../../models/chitiethoadonxuat';
import { ChiTietKhuyenMai } from '../../models/chitietkhuyenmai';
import { HoaDonXuat } from '../../models/hoadonxuat';
import { KhuyenMai } from '../../models/khuyenmai';
import { NhaSanXuat } from '../../models/nhasanxuat';
import { Product } from '../../models/Product';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    api_url = environment.api_storage;
    carts: Cart[] = [];
    subscriptions: Subscription[] = [];
    sanphams: Product[] = [];
    constructor(
        private cartService: CartService,
        private homePageService: HomePageService
    ) {}
    ngOnInit() {
        this.homePageService.FetchProduct();
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.homePageService.ProductObs.subscribe(
                data => {
                    this.sanphams = data.slice();
                },
                err => {}
            ),
            this.cartService.currentCart.subscribe(
                data => {
                    this.carts = data;
                },
                err => {}
            )
        );
    }
    findSanPham(idsanpham: number) {
        if (this.sanphams) {
            return this.sanphams.filter(e => {
                return e.id === idsanpham;
            })[0];
        } else {
            return null;
        }
    }
    loadthanhtien() {
        if (this.sanphams) {
            const sumTotal = this.carts.reduce((total, item) => {
                const obj = this.findSanPham(item.idSanPham);
                return obj
                    ? (total += obj.price * (1 - obj.rate) * item.SoLuong)
                    : 0;
            }, 0);
            if (this.cartService.totalSubject.value !== sumTotal) {
                this.cartService.totalSubject.next(sumTotal);
            }

            return sumTotal;
        } else {
            if (this.cartService.totalSubject.value !== 0) {
                this.cartService.totalSubject.next(0);
            }
            return 0;
        }
    }
}
