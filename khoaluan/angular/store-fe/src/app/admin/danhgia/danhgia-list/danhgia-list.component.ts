import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DanhGia } from '../../../models/danhgia';
import { Subscription } from 'rxjs';
import { DanhgiaService } from '../../../services/danhgia.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DanhgiaCreateComponent } from '../danhgia-create/danhgia-create.component';
import { DanhgiaEditComponent } from '../danhgia-edit/danhgia-edit.component';
import { SanphamService } from '../../../services/sanpham.service';
import { UserService } from 'src/app/services/user.service';
import { Sanpham } from '../../../models/sanpham';
import { User } from '../../../models/user';
import { MyHelper } from '../../../helper/MyHelper';

@Component({
    selector: 'app-danhgia-list',
    templateUrl: './danhgia-list.component.html',
    styleUrls: ['./danhgia-list.component.css']
})
export class DanhgiaListComponent implements OnInit, OnDestroy {
    title = 'ĐÁNH GIÁ';
    expand = false;
    columnsToDisplay = this.expand
        ? [
              'id',
              'diem',
              'noidung',
              'idsanpham',
              'iduser',
              'created_at',
              'updated_at',
              'action'
          ]
        : ['id', 'diem', 'noidung', 'idsanpham', 'iduser', 'action'];
    danhgias: DanhGia[] = [];
    sanphams: Sanpham[] = [];
    users: User[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    constructor(
        // private sanphamService: SanphamService,
        // private userService: UserService,
        private danhgiaService: DanhgiaService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService,
        private myHelper: MyHelper
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.isLoading = true;
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.danhgiaService.currentDanhGia.subscribe(
                data => {
                    this.danhgias = data;
                    this.dataSource = new MatTableDataSource<DanhGia>(
                        this.danhgias
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                err => {}
            )
        );
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    onDelete(danhgia: DanhGia) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.danhgiaService.delete(danhgia);
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
                  'diem',
                  'noidung',
                  'idsanpham',
                  'iduser',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : ['id', 'diem', 'noidung', 'idsanpham', 'iduser', 'action'];
    }
    onAdd() {
        this.dialog.open(DanhgiaCreateComponent, {
            width: '400px'
        });
    }
    onEdit(data) {
        this.dialog.open(DanhgiaEditComponent, {
            width: '400px',
            data
        });
    }
}
