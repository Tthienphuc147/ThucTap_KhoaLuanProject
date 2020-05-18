import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DanhMuc } from 'src/app/models/danhmuc';
import { environment } from '../../../environments/environment';
import { ChiTietHoaDonNhap } from '../../models/chitiethoadonnhap';
import { ChiTietKhuyenMai } from '../../models/chitietkhuyenmai';
import { KhuyenMai } from '../../models/khuyenmai';
import { Sanpham } from '../../models/sanpham';
import { DanhmucService } from '../../services/danhmuc.service';
import { DataService } from '../../services/data.service';
import { HomePageService } from '../../services/home-page.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
    constructor(
        private danhmucService: DanhmucService,
        private dataService: DataService,
        private homepageService: HomePageService
    ) {}
    private api_url = environment.api_img;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((e, index) => {
                e.unsubscribe();
            });
        }
        this.dataService.setIsShow(false);
    }
    isActive1 = true;
    isActive2 = false;
    isActive3 = false;
    danhmucs: DanhMuc[] = [];
    myblocks: DanhMuc[] = [];
    sanphams: Sanpham[] = [];
    chitietHDNs: ChiTietHoaDonNhap[] = [];
    khuyenmais: KhuyenMai[] = [];
    chitietkhuyenmais: ChiTietKhuyenMai[] = [];
    subscriptions: Subscription[] = [];
    optionTab = 1;

    ngOnInit() {
        this.danhmucService.getAll();
        // this.homepageService.FetchProduct();
        this.homepageService.GetTopSell();
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                    this.myblocks = this.danhmucs.slice(0, 4);
                },
                err => {}
            )
        );
        this.dataService.setIsShow(true);
    }
    onClickTab(number: number) {
        if (number === 1) {
            this.isActive1 = true;
            this.isActive2 = false;
            this.isActive3 = false;
        }
        if (number === 2) {
            this.isActive1 = false;
            this.isActive2 = true;
            this.isActive3 = false;
        }
        if (number === 3) {
            this.isActive1 = false;
            this.isActive2 = false;
            this.isActive3 = true;
        }
        this.dataService.setIdTab(number);
    }
}
