import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChiTietHoaDonXuat } from 'src/app/models/chitiethoadonxuat';
import { HoaDonXuat } from 'src/app/models/hoadonxuat';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
    selector: 'app-lichsuhoadon',
    templateUrl: './lichsuhoadon.component.html',
    styleUrls: ['./lichsuhoadon.component.css']
})
export class LichsuhoadonComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => e.unsubscribe());
        }
    }
    currentUser: User;
    hoadonxuats: HoaDonXuat[] = [];
    isLoading = true;
    subcriptions: Subscription[] = [];
    chitietHDXs: ChiTietHoaDonXuat[] = [];
    columnsToDisplay = ['id', 'Hinh', 'idSanPham', 'DonGia', 'SoLuong'];
    newTable: ChiTietHoaDonXuat[] = [];
    orders = {};
    constructor(
        private loginService: LoginService,
        private profileSevice: ProfileService
    ) {}

    ngOnInit() {
        this.loadData();
    }
    transformTable() {
        this.chitietHDXs.forEach(e => {
            let status = false;
            this.newTable.forEach(item => {
                if (item.idSanPham === e.idSanPham) {
                    item.SoLuong += e.SoLuong;
                    status = true;
                }
            });
            if (status === false) {
                const newitem: ChiTietHoaDonXuat = new ChiTietHoaDonXuat(
                    e.id,
                    e.SoLuong,
                    e.DonGia,
                    e.MaDotNhap,
                    e.idHDX,
                    e.idSanPham,
                    e.created_at,
                    e.updated_at
                );
                this.newTable.push(newitem);
            }
        });
    }
    loadData() {
        this.currentUser = this.loginService.currentUserValue;
        this.isLoading = true;
        this.subcriptions.push(
            this.profileSevice.ExportOrderObs.subscribe(data => {
                this.orders = this.groupBy(data, 'id');
            })
        );
    }
    groupBy(array, prop) {
        return array.reduce((groups, item) => {
            const val = item[prop];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
    }
}
