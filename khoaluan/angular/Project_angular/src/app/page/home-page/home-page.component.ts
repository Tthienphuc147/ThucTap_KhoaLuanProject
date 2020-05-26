import { KhuyenmaiService } from './../../services/khuyenmai.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdsPopupComponent } from 'src/app/components/ads-popup/ads-popup.component';
import { ChitietkhuyenmaiService } from 'src/app/services/chitietkhuyenmai.service';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { tap, take } from 'rxjs/operators';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {
    itemKhuyenMai: any;
    constructor(
        private danhmucService: DanhmucService,
        private dataService: DataService,
        private homepageService: HomePageService,
        private dialog:MatDialog,
        private khuyenMaiService: ChitietkhuyenmaiService,
        private router: Router
    ) {
    }
    public api_url = environment.api_img;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((e, index) => {
                e.unsubscribe();
            });
        }
        this.dataService.setIsShow(false);
        this.dialog.closeAll();
    }
    ngAfterViewInit() {
        setTimeout( () => {
            this.openAdsModal();
        },5*1000)

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
        this.khuyenMaiService.getChiTietKhuyenMai().subscribe(res =>{
            this.itemKhuyenMai = (res && res.data[res.data.length -1]);
            console.log(this.itemKhuyenMai);
        })
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
    openAdsModal(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            image: this.itemKhuyenMai.anh_mo_ta,
            idSanPham: this.itemKhuyenMai.idSanPham
        };
        this.dialog.open(AdsPopupComponent,dialogConfig);

    }

}
