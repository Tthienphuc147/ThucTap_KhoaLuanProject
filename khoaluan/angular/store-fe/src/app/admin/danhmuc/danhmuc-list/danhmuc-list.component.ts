import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DanhmucService } from '../../../services/danhmuc.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DanhMuc } from '../../../models/danhmuc';
import { DanhmucAddComponent } from '../danhmuc-add/danhmuc-add.component';
import { DanhmucEditComponent } from '../../../admin/danhmuc/danhmuc-edit/danhmuc-edit.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
    selector: 'app-danhmuc-list',
    templateUrl: './danhmuc-list.component.html',
    styleUrls: ['./danhmuc-list.component.css']
})
export class DanhmucListComponent implements OnInit, OnDestroy {
    expand = false;
    columnsToDisplay = this.expand
        ? ['id', 'ten', 'parent', 'hinh', 'created_at', 'updated_at', 'action']
        : ['id', 'ten', 'parent', 'hinh', 'action'];
    danhmucs: DanhMuc[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    constructor(
        private danhMucService: DanhmucService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.danhMucService.getAll();
        this.loadData();
    }
    getDanhMuc(id: number) {
        let sp = null;
        this.danhmucs.forEach(e => {
            if (e.id === id) {
                sp = e;
                return false;
            }
        });
        return sp;
    }
    loadData() {
        this.subscriptions.push(
            this.danhMucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                    this.dataSource = new MatTableDataSource<DanhMuc>(
                        this.danhmucs
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                () => {}
            ),
            this.danhMucService.isLoadingObs.subscribe(data => {
                this.isLoading = data;
            })
        );
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    onDelete(danhmuc: DanhMuc) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.danhMucService.delete(danhmuc);
            }
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'ten',
                  'parent',
                  'hinh',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : ['id', 'ten', 'parent', 'hinh', 'action'];
    }
    onAdd() {
        this.dialog.open(DanhmucAddComponent, {
            width: '400px'
        });
    }
    onEdit(item) {
        this.dialog.open(DanhmucEditComponent, {
            width: '400px',
            data: item
        });
    }
    trackByFn(index, item) {
        return index;
    }
}
