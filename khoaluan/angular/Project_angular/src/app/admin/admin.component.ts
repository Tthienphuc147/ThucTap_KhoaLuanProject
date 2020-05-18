import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Sanpham } from '../models/sanpham';

import { HoadonxuatService } from '../services/hoadonxuat.service';

import { MyHelper } from '../helper/MyHelper';

import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { HoaDonXuat } from '../models/hoadonxuat';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    providers: []
})
export class AdminComponent implements OnInit, OnDestroy {
    api_url = environment.api_img;
    subscriptions: Subscription[] = [];
    currentUser: User;
    sanphams: Sanpham[] = [];
    hoadonxuats: HoaDonXuat[] = [];
    count = 0;
    mobileQuery: MediaQueryList;
    fillerNav = [
        { name: 'Bảng điều khiển', link: 'dashboard' },
        { name: 'Phân quyền', link: 'phanquyen' },
        { name: 'Báo cáo', link: 'baocao' },
        { name: 'Nhà Cung Cấp', link: 'nhacungcap' },
        { name: 'Nhà Sản Xuất', link: 'nhasanxuat' },
        { name: 'Danh Mục', link: 'danhmuc' },
        { name: 'Danh mục hình', link: 'danhmuchinh' },
        { name: 'Sản phẩm', link: 'sanpham' },
        { name: 'Khuyến mãi', link: 'khuyenmai' },
        { name: 'Quyền', link: 'quyen' },
        { name: 'Đánh giá', link: 'danhgia' },
        { name: 'Hóa đơn nhập', link: 'hoadonnhap' },
        { name: 'Hóa đơn xuất', link: 'hoadonxuat' },
        { name: 'Địa điểm', link: 'diadiem' }
    ];
    _mobileQueryListener: () => void;
    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private loginService: LoginService,
        private router: Router,
        private myHelper: MyHelper,
        private hoadonxuatService: HoadonxuatService,
        private userService: UserService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.userService.getAll();
        this.hoadonxuatService.getAll();
    }
    ngOnInit(): void {
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
            }),
            this.hoadonxuatService.itemsObs.subscribe(data => {
                this.hoadonxuats = data;
                this.count = this.hoadonxuats.filter(
                    e => e.idTrangThai === 1
                ).length;
            })
        );
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    onLogout() {
        this.loginService.logout();
        this.router.navigate(['/']);
    }
    getCountDH() {
        return this.count;
    }
}
