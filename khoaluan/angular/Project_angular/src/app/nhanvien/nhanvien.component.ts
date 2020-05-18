import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyHelper } from '../helper/MyHelper';
import { Sanpham } from '../models/sanpham';
import { User } from '../models/user';
import { HoadonxuatService } from '../services/hoadonxuat.service';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-nhanvien',
    templateUrl: './nhanvien.component.html',
    styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit, OnDestroy {
    api_url = environment.api_url;
    subscriptions: Subscription[] = [];
    currentUser: User;
    sanphams: Sanpham[] = [];
    mobileQuery: MediaQueryList;
    fillerNav = [
        { name: 'Báo cáo', link: 'baocao' },
        { name: 'Khuyến mãi', link: 'khuyenmai' },
        { name: 'Hóa đơn xuất', link: 'hoadonxuat' }
    ];
    _mobileQueryListener: () => void;
    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private loginService: LoginService,
        private router: Router,
        private myHelper: MyHelper,
        private hoadonxuatService: HoadonxuatService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit(): void {
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
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
        // return this.hoadonxuatService.getCountChuaXuLi();
        return 0;
    }
}
