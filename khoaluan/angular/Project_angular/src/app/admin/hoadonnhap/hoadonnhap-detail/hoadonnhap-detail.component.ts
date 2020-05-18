import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ChiTietHoaDonNhap } from '../../../models/chitiethoadonnhap';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'src/app/services/sanpham.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

import { HoadonnhapService } from '../../../services/hoadonnhap.service';
import { Sanpham } from '../../../models/sanpham';
import { ChitietHoaDonNhapService } from '../../../services/chitiethoadonnhap.service';
import { HoaDonNhap } from '../../../models/hoadonnhap';
import { environment } from '../../../../environments/environment';

class MyNode {
    obj: ChiTietHoaDonNhap;
    isShow: boolean;
    constructor(obj: ChiTietHoaDonNhap, isshow: boolean) {
        this.obj = obj;
        this.isShow = isshow;
    }
}
@Component({
    selector: 'app-hoadonnhap-detail',
    templateUrl: './hoadonnhap-detail.component.html',
    styleUrls: ['./hoadonnhap-detail.component.css']
})
export class HoadonnhapDetailComponent implements OnInit, OnDestroy {
    private api_url = environment.api_img;
    listShow = [];
    myNodes: MyNode[] = [];
    expand = false;
    columnsToDisplay = this.expand
        ? [
              'id',
              'idSanPham',
              'SoLuong',
              'GiaNhap',
              'GiaBan',
              'created_at',
              'updated_at',
              'action'
          ]
        : ['id', 'idSanPham', 'SoLuong', 'GiaNhap', 'GiaBan', 'action'];
    displayedColumnsSanPham = ['TenSanPham'];
    subscriptions: Subscription[] = [];
    dataSource;
    dataSourceSanPham;
    isLoading = false;
    sanphams: Sanpham[] = [];
    chitiethoadonnhaps: ChiTietHoaDonNhap[] = [];
    hoadonnhap: HoaDonNhap;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(
        private thongbaoService: ThongbaoService,
        private activateRouteService: ActivatedRoute,
        private sanphamService: SanphamService,
        private confirmDialogService: ConfirmDialogService,
        private chitiethoadonnhapService: ChitietHoaDonNhapService,
        private hoadonnhapService: HoadonnhapService
    ) {}

    ngOnInit() {
        this.sanphamService.getAll();
        this.chitiethoadonnhapService.referDetailById(
            this.activateRouteService.params['_value'].id
        );
        this.loadData();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    loadData() {
        this.isLoading = true;
        this.subscriptions.push(
            this.chitiethoadonnhapService.itemsDetailObs.subscribe(
                data => {
                    data.map((e, index) => {
                        this.listShow[index] =
                            this.listShow[index] !== undefined
                                ? this.listShow[index]
                                : true;
                        return e;
                    });
                    this.myNodes = [];
                    this.chitiethoadonnhaps = data.slice();
                    this.chitiethoadonnhaps.forEach(e => {
                        this.myNodes.push(new MyNode(e, true));
                    });
                    this.dataSource = new MatTableDataSource<MyNode>(
                        this.myNodes
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                () => {}
            ),
            this.sanphamService.itemsObs.subscribe(
                data => {
                    this.sanphams = data;
                    this.dataSourceSanPham = this.sanphams.slice();
                },
                () => {}
            )
        );
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    applyFilterAdd(filterValue: string) {
        this.dataSourceSanPham = this.sanphams
            .filter(e => {
                return e.TenSanPham.trim()
                    .toLowerCase()
                    .includes(filterValue.trim().toLowerCase());
            })
            .slice();
    }
    onSelectSanPham(row) {
        const formData = new FormData();
        formData.append('SoLuong', '0');
        formData.append('GiaNhap', '0');
        formData.append('GiaBan', '0');
        formData.append('idHDN', this.activateRouteService.params['value'].id);
        formData.append('idSanPham', row.id);
        const index = this.chitiethoadonnhaps.findIndex(
            e => e.idSanPham === row.id
        );
        if (index !== -1) {
            this.thongbaoService.open('Sản phẩm đã tồn tại', 'bg-danger');
        } else {
            this.chitiethoadonnhapService.createNew(formData);
        }
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'idSanPham',
                  'SoLuong',
                  'GiaNhap',
                  'GiaBan',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : ['id', 'idSanPham', 'SoLuong', 'GiaNhap', 'GiaBan', 'action'];
    }
    onCancel(item, i) {
        this.listShow[i] = !this.listShow[i];
        const index = this.chitiethoadonnhaps.findIndex(
            e => e.id === item.obj.id
        );
        item.obj = this.chitiethoadonnhaps[index];
    }
    onSaveRow(item, i) {
        this.listShow[i] = !this.listShow[i];
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in item.obj) {
            formData.append(key, item.obj[key]);
        }
        this.chitiethoadonnhapService.update(formData);
    }
    onDelete(item: ChiTietHoaDonNhap) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.chitiethoadonnhapService.delete(item);
            }
        });
    }
    trackByFn(index, item) {
        console.log(item);

        return index;
    }
}
