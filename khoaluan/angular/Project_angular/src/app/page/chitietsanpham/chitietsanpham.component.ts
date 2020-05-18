import { ImagePopupComponent } from './../../components/image-popup/image-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Sanpham } from 'src/app/models/sanpham';
import { User } from 'src/app/models/user';
import { environment } from '../../../environments/environment';
import { Cart } from '../../models/cart';
import { DanhMucHinh } from '../../models/danhmuchinh';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';
import { LoginService } from '../../services/login.service';
import { ProductDetailService } from '../../services/product-detail.service';
import { DanhgiaComponent } from './danhgia/danhgia.component';

@Component({
    selector: 'app-chitietsanpham',
    templateUrl: './chitietsanpham.component.html',
    styleUrls: ['./chitietsanpham.component.css']
})
export class ChitietsanphamComponent implements OnInit, OnDestroy {
    api_url = environment.api_storage;
    soluong = 1;
    currentUser: User = null;
    currentHinh = '';
    product: Product;
    hinhs = [];
    subscriptions: Subscription[] = [];
    slideConfig = {
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipe: true,
        touchMove: true,
        nextArrow: '.next',
        prevArrow: '.prev',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 4,
                    dot: true
                }
            }
        ]
    };
    @ViewChild(DanhgiaComponent, { static: true })
    danhgia_com: DanhgiaComponent;
    constructor(
        private activatedRoute: ActivatedRoute,
        private cartService: CartService,
        private productdetailService: ProductDetailService,
        private loginService: LoginService,
        private dialog:MatDialog
    ) {}
    ngOnInit() {
        this.loadData();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    onPlus() {
        if (this.soluong < 10) {
            this.soluong++;
        }
    }
    onMinus() {
        if (this.soluong > 1) {
            this.soluong--;
        }
    }
    loadData() {
        this.subscriptions.push(
            this.productdetailService.ProductDetailObs.subscribe(data => {
                if (data) {
                    this.product = data;
                    this.currentHinh = this.product.Hinh;
                }
            }),
            this.productdetailService.ImageDetailObs.subscribe(data => {
                if (data) {
                    this.hinhs = data;
                    this.hinhs.map(item => item.Hinh);
                }
            }),
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
                if (this.currentUser) {
                    this.productdetailService.checkBill(
                        this.currentUser.id,
                        this.activatedRoute.params['value'].id
                    );
                }
            }),
            this.activatedRoute.params.subscribe(data => {
                this.productdetailService.FetchProduct(
                    this.activatedRoute.params['value'].id
                );
                if (this.currentUser) {
                    this.productdetailService.checkBill(
                        this.currentUser.id,
                        this.activatedRoute.params['value'].id
                    );
                }
                document.body.scrollTop = 0;
            }),
            this.loginService.currentUser.subscribe(data => {})
        );


    }
    onChangeHinh(e) {
        debounceTime(400);
        this.currentHinh = e.Hinh;
    }
    onAddCart(sp: Sanpham) {
        this.cartService.addCart(new Cart(sp.id, this.soluong));
    }
    openImageModal(img: string){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            image: img
        };
        this.dialog.open(ImagePopupComponent,dialogConfig);
    }
}
