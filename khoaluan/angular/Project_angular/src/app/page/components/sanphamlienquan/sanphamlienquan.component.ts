import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sanpham } from 'src/app/models/sanpham';
import { ChiTietHoaDonNhap } from 'src/app/models/chitiethoadonnhap';
import { ChiTietHoaDonXuat } from 'src/app/models/chitiethoadonxuat';
import { KhuyenMai } from 'src/app/models/khuyenmai';
import { ChiTietKhuyenMai } from 'src/app/models/chitietkhuyenmai';
import { Subscription } from 'rxjs';
import { SanphamService } from 'src/app/services/sanpham.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { ActivatedRoute } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { DanhmucService } from '../../../services/danhmuc.service';
import { HomePageService } from '../../../services/home-page.service';
import { Product } from '../../../models/Product';

@Component({
    selector: 'app-sanphamlienquan',
    templateUrl: './sanphamlienquan.component.html',
    styleUrls: ['./sanphamlienquan.component.css']
})
export class SanphamlienquanComponent implements OnInit, OnDestroy {
    @ViewChild('slickModal', { static: false }) myslick: SlickCarouselComponent;
    api_url = environment.api_storage;
    sanpham: Sanpham;
    products: Product[];
    product: Product;
    idtab: number;
    slideConfig = {
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplaySpeed: 3000,
        pauseOnFocus: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: true,
                    centerPadding: '0px'
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '60px'
                }
            }
        ]
    };
    sanphamall: Sanpham[] = [];
    idSanPham: number;
    mysubdanhmuc: number[] = [];
    sanphams: Sanpham[] = [];
    chitietHDNs: ChiTietHoaDonNhap[] = [];
    chitietHDXs: ChiTietHoaDonXuat[] = [];
    khuyenmais: KhuyenMai[] = [];
    chitietkhuyenmais: ChiTietKhuyenMai[] = [];
    subscriptions: Subscription[] = [];
    isloaded = false;
    array_top: number[] = [];
    constructor(
        private danhmucService: DanhmucService,
        private cartService: CartService,
        private activatedRoute: ActivatedRoute,
        private homepageService: HomePageService
    ) {}

    ngOnInit() {
        this.homepageService.FetchProduct();
        this.loadData();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    loadData() {
        this.subscriptions.push(
            this.homepageService.ProductObs.subscribe(data => {
                data = data.slice();
                if (data) {
                    this.product = data.filter(e => {
                        return (
                            e.id ===
                            Number.parseInt(
                                this.activatedRoute.params['value'].id
                            )
                        );
                    })[0];
                    if (this.product) {
                        this.products = data.splice(0, 8);
                    }
                    if (this.products && this.products.length < 4) {
                        this.myslick.unslick();
                    }
                }
            }),
            this.activatedRoute.params.subscribe(data => {
                this.idSanPham = data['id'];
            })
        );
    }
    onAddCart(sp) {
        this.cartService.addCart(new Cart(sp.id, 1));
    }
    trackByFn(index, item) {
        return index;
    }
}
