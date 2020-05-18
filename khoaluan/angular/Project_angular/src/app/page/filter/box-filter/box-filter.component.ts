import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DanhMuc } from 'src/app/models/danhmuc';
import { DanhmucService } from 'src/app/services/danhmuc.service';
import { HomePageService } from 'src/app/services/home-page.service';
import { NhaSanXuat } from '../../../models/nhasanxuat';
import { Product } from '../../../models/Product';
import { NhasanxuatService } from '../../../services/nhasanxuat.service';
import { FilterService } from './../../../services/filter.service';

@Component({
    selector: 'app-box-filter',
    templateUrl: './box-filter.component.html',
    styleUrls: ['./box-filter.component.css']
})
export class BoxFilterComponent implements OnInit, OnDestroy {
    iddanhmuc: number;
    array_filter: number[] = [];
    sanphams: Product[] = [];
    sort1: any;
    array_filter_hang: number[] = [];
    sort_gia: number;
    subscriptions: Subscription[] = [];
    danhmucs: DanhMuc[] = [];
    checked = false;
    nhasanxuats: NhaSanXuat[] = [];
    constructor(
        // private sanphamService: SanphamService,
        private danhmucService: DanhmucService,
        private activatedRoute: ActivatedRoute,
        private filterService: FilterService,
        private nhasanxuatService: NhasanxuatService,
        private router: Router,
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
            //     this.sanphams = data.slice();
            // }),
            this.homePageService.ProductObs.subscribe(data => {
                this.sanphams = data.slice();
            }),
            this.danhmucService.itemsObs.subscribe(data => {
                this.danhmucs = data;
            }),
            this.nhasanxuatService.itemsObs.subscribe(data => {
                this.nhasanxuats = data;
            }),
            this.activatedRoute.queryParamMap.subscribe(data => {
                this.sort1 = data['params']['sortBy']
                    ? data['params']['sortBy']
                    : null;
                this.sort_gia = data['params']['price']
                    ? data['params']['price']
                    : null;
                this.array_filter_hang = [];
                if (typeof data['params']['nsx'] === 'object') {
                    data['params']['nsx'].forEach(e => {
                        this.array_filter_hang.push(e);
                    });
                }
                if (typeof data['params']['nsx'] === 'string') {
                    this.array_filter_hang.push(data['params']['nsx']);
                }
            })
        );
    }
    onKiemTra_Hang(item: NhaSanXuat) {
        if (this.array_filter_hang.length === 0) {
            return false;
        }
        return this.array_filter_hang.filter(e => {
            return item.id === e;
        }).length > 0
            ? true
            : false;
    }
    getsubdanhmuc(id: number) {
        const mang = [];
        this.findChildDeQuy(id, mang);
        return mang;
    }
    findChildDeQuy(id: number, array: number[]) {
        array.push(Number.parseInt(id + ''));
        this.danhmucs.forEach(element => {
            if (element.idParent === Number.parseInt(id + '')) {
                this.findChildDeQuy(element.id, array);
            }
        });
    }
    findDanhMuc(iddanhmuc: number) {
        if (iddanhmuc === 0) {
            return this.danhmucs.filter(e => {
                return e.idParent == null;
            });
        } else {
            return this.danhmucs.filter(e => {
                return e.idParent === iddanhmuc;
            });
        }
    }
    onChangeSort_param() {
        this.router.navigate(['/search'], {
            queryParams: { sortBy: this.sort1 },
            queryParamsHandling: 'merge'
        });
    }
    onCheck_param(event, id) {
        if (event.checked) {
            this.array_filter.push(id);
        } else {
            this.array_filter = this.array_filter.filter(e => {
                return e !== id;
            });
        }
        this.router.navigate(['/search'], {
            queryParams: { cat: this.array_filter },
            queryParamsHandling: 'merge'
        });
    }
    onCheckedHang_param(event, id) {
        if (event.checked) {
            this.array_filter_hang.push(id);
            this.router.navigate(['/search'], {
                queryParams: { nsx: this.array_filter_hang },
                queryParamsHandling: 'merge'
            });
        } else {
            this.array_filter_hang = this.array_filter_hang.filter(e => {
                return e !== id;
            });
            this.router.navigate(['/search'], {
                queryParams: { nsx: this.array_filter_hang },
                queryParamsHandling: 'merge'
            });
        }
    }
    onChangeAll(event, data) {
        this.array_filter = [];
        if (event.checked) {
            data.forEach(e => {
                this.array_filter.push(e.id);
            });
        }
        this.router.navigate(['/search'], {
            queryParams: { cat: this.array_filter },
            queryParamsHandling: 'merge'
        });
    }
    onChangeSort_gia() {
        this.router.navigate(['/search'], {
            queryParams: { price: this.sort_gia },
            queryParamsHandling: 'merge'
        });
    }

    // getbanggia(idsanpham: number): ChiTietHoaDonNhap {
    //     return this.sanphamService.getbanggia(idsanpham);
    // }
    // getTiLe(idsanpham: number): number {
    //     return this.sanphamService.getTiLe(idsanpham);
    // }
}
