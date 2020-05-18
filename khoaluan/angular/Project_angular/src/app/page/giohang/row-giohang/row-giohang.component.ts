import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Sanpham } from 'src/app/models/sanpham';
import { CartService } from 'src/app/services/cart.service';
import { HomePageService } from 'src/app/services/home-page.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-row-giohang',
    templateUrl: './row-giohang.component.html',
    styleUrls: ['./row-giohang.component.css']
})
export class RowGiohangComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    api_url = environment.api_storage;
    @Input() item: Cart;
    soluong: number;
    carts: Cart[] = [];
    subscriptions: Subscription[] = [];
    sanphams: Sanpham[] = [];
    constructor(
        private cartService: CartService,
        private homePageService: HomePageService
    ) {}

    ngOnInit() {
        this.soluong = this.item.SoLuong;
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.homePageService.ProductObs.subscribe(
                data => {
                    this.sanphams = data;
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
    onChangeInput() {
        if (
            this.item.SoLuong > 10 ||
            this.item.SoLuong < 0 ||
            this.item.SoLuong == null
        ) {
            this.item.SoLuong = 1;
        }
        this.cartService.updateItem(this.item);
    }
    onPlus() {
        if (this.item.SoLuong < 10) {
            this.item.SoLuong++;
            this.cartService.updateItem(this.item);
        }
    }
    onMinus() {
        if (this.item.SoLuong > 1) {
            this.item.SoLuong--;
            this.cartService.updateItem(this.item);
        }
    }
    onDeleteRow(e) {
        this.cartService.removeCart(e);
    }
    findSanPham(idsanpham: number) {
        if (this.sanphams) {
            return this.sanphams.filter(e => {
                return e.id === idsanpham;
            })[0];
        }
    }
}
