import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { ChiTietHoaDonNhap } from 'src/app/models/chitiethoadonnhap';
import { ChiTietHoaDonXuat } from 'src/app/models/chitiethoadonxuat';
import { ChiTietKhuyenMai } from 'src/app/models/chitietkhuyenmai';
import { KhuyenMai } from 'src/app/models/khuyenmai';
import { Sanpham } from 'src/app/models/sanpham';
import { CartService } from 'src/app/services/cart.service';
import { SanphamService } from 'src/app/services/sanpham.service';
import { environment } from '../../../../environments/environment';
import { NhaSanXuat } from '../../../models/nhasanxuat';
import { NhasanxuatService } from '../../../services/nhasanxuat.service';
import { HomePageService } from 'src/app/services/home-page.service';
import { Product } from '../../../models/Product';

@Component({
    selector: 'app-sanphambanchay',
    templateUrl: './sanphambanchay.component.html',
    styleUrls: ['./sanphambanchay.component.css']
})
export class SanphambanchayComponent implements OnInit, OnDestroy {
    api_url = environment.api_storage;
    subscriptions: Subscription[] = [];
    sanphams: Product[] = [];
    chitietHDNs: ChiTietHoaDonNhap[] = [];
    chitietHDXs: ChiTietHoaDonXuat[] = [];
    khuyenmais: KhuyenMai[] = [];
    chitietkhuyenmais: ChiTietKhuyenMai[] = [];
    nhasanxuats: NhaSanXuat[] = [];
    constructor(
        private cartService: CartService,
        // private sanphamService: SanphamService,
        private nhasanxuatService: NhasanxuatService,
        private homePageService: HomePageService
    ) {}

    ngOnInit() {
        this.loadData();
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    loadData() {
        this.subscriptions.push(
            // this.sanphamService.currentSanpham.subscribe(data => {
            //     this.sanphams = data;
            // }),
            this.homePageService.ProductObs.subscribe(data => {
                this.sanphams = data;
            }),

            this.nhasanxuatService.itemsObs.subscribe(
                data => {
                    this.nhasanxuats = data;
                },
                err => {}
            )
        );
    }
    // getbanggia(idsanpham: number): ChiTietHoaDonNhap {
    //     return this.sanphamService.getbanggia(idsanpham);
    // }
    // getTiLe(idsanpham: number): number {
    //     return this.sanphamService.getTiLe(idsanpham);
    // }
    onAddCart(sp) {
        this.cartService.addCart(new Cart(sp.id, 1));
    }
    // findNhaSanXuat(id: number) {
    //     return this.nhasanxuats.filter(e => {
    //         return e.id === id;
    //     })[0];
    // }
    slideConfig = {
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        touchMove: true,
        nextArrow: '.next',
        prevArrow: '.prev',
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    vertical: false,
                    verticalSwiping: false
                }
            }
        ]
    };
}
