import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-chitietdonhang',
    templateUrl: './chitietdonhang.component.html',
    styleUrls: ['./chitietdonhang.component.css']
})
export class ChitietdonhangComponent implements OnInit, OnDestroy {
    api_url = environment.api_img;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    dataSource;
    subscriptions: Subscription[] = [];
    columnsToDisplay = ['Hinh', 'idSanPham', 'DonGia', 'SoLuong'];
    newTable = [];
    @Input() orderDetails: [];
    constructor() {}
    ngOnInit() {
        this.loadData();
    }
    transformTable() {
        this.orderDetails.forEach(e => {
            const newitem = {
                id: e['id'],
                Hinh: e['Hinh'],
                SoLuong: e['SoLuong'],
                DonGia: e['DonGia'],
                TenSanPham: e['TenSanPham']
            };
            this.newTable.push(newitem);
        });
    }
    loadData() {
        this.transformTable();
        this.dataSource = new MatTableDataSource<any>(this.newTable);
    }
}
