import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DanhMucHinh } from 'src/app/models/danhmuchinh';
import { Subscription } from 'rxjs';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { DanhmuchinhService } from '../../../services/danhmuchinh.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DanhmuchinhCreateComponent } from '../danhmuchinh-create/danhmuchinh-create.component';
import { DanhmuchinhEditComponent } from '../danhmuchinh-edit/danhmuchinh-edit.component';
import { SanphamService } from '../../../services/sanpham.service';
import { Sanpham } from '../../../models/sanpham';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-danhmuchinh-list',
    templateUrl: './danhmuchinh-list.component.html',
    styleUrls: ['./danhmuchinh-list.component.css']
})
export class DanhmuchinhListComponent implements OnInit, OnDestroy {
    private api_url = environment.api_img;
    expand = false;
    columnsToDisplay = this.expand
        ? ['id', 'hinh', 'sanpham', 'created_at', 'updated_at', 'action']
        : ['id', 'hinh', 'sanpham', 'action'];
    danhmuchinhs: DanhMucHinh[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    sanphams: any[] = [];
    constructor(
        private sanphamService: SanphamService,
        private danhmuchinhService: DanhmuchinhService,
        private thongbaoService: ThongbaoService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    ngOnInit() {
        this.danhmuchinhService.getAll();
        this.sanphamService.getAll();
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.sanphamService.itemsObs.subscribe(data => {
                this.sanphams = data;
            }),
            this.danhmuchinhService.itemsObs.subscribe(
                data => {
                    this.danhmuchinhs = data;
                    this.dataSource = new MatTableDataSource<DanhMucHinh>(
                        this.danhmuchinhs
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                () => {}
            ),
            this.danhmuchinhService.isLoadingObs.subscribe(data => {
                this.isLoading = data;
            })
        );
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
        }
    }
    onDelete(danhmuc: DanhMucHinh) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.danhmuchinhService.delete(danhmuc);
            }
        });
    }
    updateTable(danhmuc) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return Number.parseInt(value.id) !== Number.parseInt(danhmuc.id);
        });
        this.table.renderRows();
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? ['id', 'hinh', 'sanpham', 'created_at', 'updated_at', 'action']
            : ['id', 'hinh', 'sanpham', 'action'];
    }
    onAdd() {
        this.dialog.open(DanhmuchinhCreateComponent, {
            width: '400px',
            data: { sanphams: this.sanphams }
        });
    }
    onEdit(data) {
        this.dialog.open(DanhmuchinhEditComponent, {
            width: '400px',
            data: {
                sanphams: this.sanphams,
                danhmuchinh: data
            }
        });
    }
    trackByFn(index, item) {
        return index;
    }
}
