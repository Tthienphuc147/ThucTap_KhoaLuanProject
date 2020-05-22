import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { KhuyenmaiService } from '../../../services/khuyenmai.service';
import { ActivatedRoute } from '@angular/router';
import { KhuyenMai } from '../../../models/khuyenmai';
import { ChiTietKhuyenMai } from '../../../models/chitietkhuyenmai';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ChitietkhuyenmaiService } from '../../../services/chitietkhuyenmai.service';
import { SanphamService } from '../../../services/sanpham.service';
import { Sanpham } from '../../../models/sanpham';

import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { ThongbaoService } from '../../../services/thongbao.service';
import { environment } from '../../../../environments/environment';

class MyNode {
    obj: ChiTietKhuyenMai;
    isShow: boolean;
    constructor(obj: ChiTietKhuyenMai, isshow: boolean) {
        this.obj = obj;
        this.isShow = isshow;
    }
}
@Component({
    selector: 'app-khuyenmai-detail',
    templateUrl: './khuyenmai-detail.component.html',
    styleUrls: ['./khuyenmai-detail.component.css']
})
export class KhuyenmaiDetailComponent implements OnInit, OnDestroy {
    private api_url = environment.api_img;
    chitietkhuyenmais: any[] = [];
    myNodes: MyNode[] = [];
    expand = false;
    columnsToDisplay = this.expand
        ? ['id', 'TiLe', 'idSanPham', 'created_at', 'updated_at', 'action']
        : ['id', 'TiLe', 'idSanPham', 'action'];
    displayedColumnsSanPham = ['TenSanPham'];
    khuyenmais: KhuyenMai[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    dataSourceSanPham;
    isLoading = false;
    sanphams: Sanpham[] = [];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(
        private thongbaoService: ThongbaoService,
        private activateRouteService: ActivatedRoute,
        private chitietkhuyenmaiService: ChitietkhuyenmaiService,
        private sanphamService: SanphamService,
        private confirmDialogService: ConfirmDialogService,
        private khuyenmaiService: KhuyenmaiService
    ) {}
    ngOnInit() {
        this.sanphamService.getAll();
        this.chitietkhuyenmaiService.referDetailById(
            this.activateRouteService.params['value'].id
        );
        this.isLoading = true;
        this.loadData();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
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
        formData.append('TiLe', '0');
        formData.append(
            'idKhuyenMai',
            this.activateRouteService.params['value'].id
        );
        formData.append('idSanPham', row.id);
        const index = this.chitietkhuyenmais.findIndex(
            e =>
                e.idKhuyenMai ===
                    this.activateRouteService.params['value'].id &&
                e.idSanPham === row.id
        );
        if (index !== -1) {
            this.thongbaoService.open('Sản phẩm đã tồn tại', 'bg-danger');
        } else {
            this.chitietkhuyenmaiService.createNew(formData);
        }
    }
    loadData() {
        this.subscriptions.push(
            this.chitietkhuyenmaiService.itemsDetailObs.subscribe(
                data => {
                    this.myNodes = [];
                    this.chitietkhuyenmais = data;
                    this.chitietkhuyenmais.forEach(e => {
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
                    this.isLoading = false;
                    this.sanphams = data;
                    this.dataSourceSanPham = this.sanphams.slice();
                },
                () => {}
            ),
            this.chitietkhuyenmaiService.isLoadingObs.subscribe(data => {
                this.isLoading = data;
            })
        );
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? ['id', 'TiLe', 'idSanPham', 'created_at', 'updated_at', 'action']
            : ['id', 'TiLe', 'idSanPham', 'action'];
    }
    onCancel(item) {
        item.isShow = !item.isShow;
        const index = this.chitietkhuyenmais.findIndex(
            e => e.id === item.obj.id
        );
        item.obj = this.khuyenmais[index];
    }
    onSaveRow(item) {
        if (
            Number.parseFloat(item.obj['TiLe']) > 0 &&
            Number.parseFloat(item.obj['TiLe']) < 1
        ) {
            const formData = new FormData();
            formData.append('_method', 'put');
            for (const key in item.obj) {
                formData.append(key, item.obj[key]);
            }
            this.chitietkhuyenmaiService.update(formData);
            item.isShow = !item.isShow;
        } else {
            this.thongbaoService.open('Tỉ lệ phải từ 0 - 1', 'bg-danger');
        }
    }
    onDelete(chitietkhuyenmai: ChiTietKhuyenMai) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.chitietkhuyenmaiService.delete(chitietkhuyenmai);
            }
        });
    }
    trackByFn(index, item) {
        return index;
    }
}
