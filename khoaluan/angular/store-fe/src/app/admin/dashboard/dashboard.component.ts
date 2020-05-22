import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SanphamService } from '../../services/sanpham.service';
import { HoadonxuatService } from '../../services/hoadonxuat.service';
import { DanhmucService } from '../../services/danhmuc.service';
import { BaocaoService } from '../../services/baocao.service';
import { Subscription } from 'rxjs';
import { HoaDonXuat } from '../../models/hoadonxuat';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(
        private userService: UserService,
        private hoadonxuatService: HoadonxuatService,
        private danhmucService: DanhmucService,
        private baocaoService: BaocaoService
    ) {}
    subscriptions: Subscription[] = [];
    hoadonxuats: HoaDonXuat[] = [];
    total = 0;
    countUser = 0;
    countCat = 0;
    countHDX = 0;
    ngOnInit() {
        this.danhmucService.getAll();
        this.loadData();
    }

    getDoanhThu() {
        return this.total;
    }
    loadData() {
        this.subscriptions.push(
            this.baocaoService
                .getDoanhThuTheoThang(new Date())
                .subscribe(data => {
                    if (data) {
                        this.total = data['total'];
                    }
                }),
            this.userService.currentUser.subscribe(data => {
                this.countUser = data.length;
            }),
            this.danhmucService.itemsObs.subscribe(data => {
                this.countCat = data.length;
            }),
            this.hoadonxuatService.itemsObs.subscribe(data => {
                this.countHDX = data.length;
            })
        );
    }
    getCountUser() {
        return this.countUser;
    }
    getCountHDX() {
        return this.countHDX;
    }
    getCountDM() {
        return this.countCat;
    }
}
