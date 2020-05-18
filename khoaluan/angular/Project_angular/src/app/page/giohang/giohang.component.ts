import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { ChiTietHoaDonNhap } from 'src/app/models/chitiethoadonnhap';
import { ChiTietHoaDonXuat } from 'src/app/models/chitiethoadonxuat';
import { ChiTietKhuyenMai } from 'src/app/models/chitietkhuyenmai';
import { KhuyenMai } from 'src/app/models/khuyenmai';
import { NhaSanXuat } from 'src/app/models/nhasanxuat';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../../models/Product';
import { HomePageService } from '../../services/home-page.service';

@Component({
    selector: 'app-giohang',
    templateUrl: './giohang.component.html',
    styleUrls: ['./giohang.component.css']
})
export class GiohangComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    counts = 0;
    carts: Cart[] = [];
    subscriptions: Subscription[] = [];
    sanphams: Product[] = [];
    khuyenmais: KhuyenMai[] = [];
    chitietkhuyenmais: ChiTietKhuyenMai[] = [];
    nhasanxuats: NhaSanXuat[] = [];
    chitietHDNs: ChiTietHoaDonNhap[] = [];
    chitietHDXs: ChiTietHoaDonXuat[] = [];
    constructor(
        private cartService: CartService,
        private homePageService: HomePageService,
        private router: Router
    ) {}

    ngOnInit() {
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
                    this.carts = data.slice();
                },
                err => {}
            ),
            this.cartService.currentCount.subscribe(data => {
                this.counts = data;
            })
        );
    }
    loadthanhtien() {
        if (this.sanphams.length > 0) {
            const sumTotal = this.carts.reduce((total, item) => {
                const obj = this.findSanPham(item.idSanPham);
                return obj
                    ? (total += obj.price * (1 - obj.rate) * item.SoLuong)
                    : 0;
            }, 0);
            return sumTotal;
        } else {
            return 0;
        }
    }
    findSanPham(idsanpham: number) {
        if (this.sanphams) {
            return this.sanphams.filter(e => {
                return e.id === idsanpham;
            })[0];
        }
    }
    onRemoveCart() {
        this.cartService.clearCart();
    }
    handleOrder() {
        let error = false;
        this.carts.forEach((item, index) => {
            const i = this.sanphams.findIndex(e => e.id === item.idSanPham);
            if (item.SoLuong > this.sanphams[i].SoLuongTon) {
                if (
                    confirm(
                        'sanpham ' +
                            this.sanphams[i].TenSanPham +
                            ' chi con' +
                            this.sanphams[i].SoLuongTon +
                            '! Bạn vẫn muốn mua sản phẩm này ?'
                    )
                ) {
                    this.carts[index].SoLuong = this.sanphams[i].SoLuongTon;
                } else {
                    error = true;
                }
            }
        });
        this.cartService.updateCart(this.carts);
        if (error) {
            return false;
        } else {
            this.router.navigateByUrl('/thanhtoan');
        }
    }
}
