import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { ChiTietHoaDonNhap } from 'src/app/models/chitiethoadonnhap';
import { Sanpham } from 'src/app/models/sanpham';
import { SanphamService } from 'src/app/services/sanpham.service';
import { environment } from '../../../../environments/environment';
import { DanhMuc } from '../../../models/danhmuc';
import { CartService } from '../../../services/cart.service';
import { DanhmucService } from '../../../services/danhmuc.service';
import { DataService } from '../../../services/data.service';
import { MobileService } from '../../../services/mobile.service';

@Component({
    selector: 'app-block-danhmuc',
    templateUrl: './block-danhmuc.component.html',
    styleUrls: ['./block-danhmuc.component.css']
})
export class BlockDanhmucComponent implements OnInit, OnDestroy {
    matches = true;
    api_url = environment.api_img;
    @Input() idblock: any;
    @Input() idbaner: number;
    mysubdanhmuc: number[] = [];
    danhmucs: DanhMuc[] = [];
    sanphams: Sanpham[] = [];
    subscriptions: Subscription[] = [];
    isloaded = false;
    is_loading = true;
    constructor(
        // private sanphamService: SanphamService,
        private danhmucService: DanhmucService,
        private cartService: CartService,
        private dataService: DataService,
        private router: Router,
        private mobileService: MobileService
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
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                    this.getallsub_danhmuc(this.idblock.id);
                },
                err => {}
            ),
            // this.sanphamService.currentSanpham.subscribe(
            //     data => {
            //         if (data.length > 0) {
            //             this.sanphams = data
            //                 .filter(e => {
            //                     return this.mysubdanhmuc.includes(e.idDanhMuc);
            //                 })
            //                 .slice(0, 8);
            //             this.is_loading = false;
            //         }
            //     },
            //     err => {}
            // ),
            this.dataService.currentIsLoaded.subscribe(data => {
                this.isloaded = data;
            }),
            this.mobileService.mobileObs.subscribe(data => {
                this.matches = data;
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
    // getbanggia(idsanpham: number): ChiTietHoaDonNhap {
    //     return this.sanphamService.getbanggia(idsanpham);
    // }
    // getTiLe(idsanpham: number): number {
    //     return this.sanphamService.getTiLe(idsanpham);
    // }
    onAddCart(sp) {
        this.cartService.addCart(new Cart(sp.id, 1));
    }
}
