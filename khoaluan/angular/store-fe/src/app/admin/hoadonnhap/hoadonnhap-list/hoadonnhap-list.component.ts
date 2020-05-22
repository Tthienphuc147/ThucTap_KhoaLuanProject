import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { UserService } from 'src/app/services/user.service';
import { HoaDonNhap } from '../../../models/hoadonnhap';
import { NhaCungCap } from '../../../models/nhacungcap';
import { HoadonnhapService } from '../../../services/hoadonnhap.service';
import { HoadonnhapCreateComponent } from '../hoadonnhap-create/hoadonnhap-create.component';
import { HoadonnhapEditComponent } from '../hoadonnhap-edit/hoadonnhap-edit.component';

@Component({
    selector: 'app-hoadonnhap-list',
    templateUrl: './hoadonnhap-list.component.html',
    styleUrls: ['./hoadonnhap-list.component.css']
})
export class HoadonnhapListComponent implements OnInit, OnDestroy {
    title = 'HÓA ĐƠN NHẬP';
    expand = false;
    columnsToDisplay = this.expand
        ? [
              'id',
              'iduser',
              'ngaynhap',
              'tongtien',
              'idncc',
              'created_at',
              'updated_at',
              'action'
          ]
        : ['id', 'iduser', 'ngaynhap', 'tongtien', 'idncc', 'action'];
    hoadonnhaps: HoaDonNhap[] = [];
    users: User[] = [];
    nhacungcaps: NhaCungCap[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;

    constructor(
        private userService: UserService,
        private hoadonnhapService: HoadonnhapService,
        public dialog: MatDialog,
        private router: Router,
        private confirmDialogService: ConfirmDialogService
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.hoadonnhapService.getAll();
        this.loadData();
    }
    onDetail(e) {
        this.router.navigate(['admin/hoadonnhap', e.id, 'detail']);
    }
    loadData() {
        this.subscriptions.push(
            this.hoadonnhapService.itemsObs.subscribe(data => {
                if (data) {
                    this.hoadonnhaps = data;
                    this.dataSource = new MatTableDataSource<HoaDonNhap>(
                        this.hoadonnhaps
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                }
            }),
            this.userService.currentUser.subscribe(
                data => {
                    this.users = data;
                },
                () => {}
            ),
            this.hoadonnhapService.isLoadingObs.subscribe(data => {
                this.isLoading = data;
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    onDelete(hoadonnhap: HoaDonNhap) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.hoadonnhapService.delete(hoadonnhap);
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
                  'iduser',
                  'ngaynhap',
                  'tongtien',
                  'idncc',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : ['id', 'iduser', 'ngaynhap', 'tongtien', 'idncc', 'action'];
    }
    onAdd() {
        this.dialog.open(HoadonnhapCreateComponent, {
            width: '400px',
            data: this.nhacungcaps
        });
    }
    onEdit(data) {
        this.dialog.open(HoadonnhapEditComponent, {
            width: '400px',
            data: {
                hoadonnhap: data,
                nhacungcaps: this.nhacungcaps
            }
        });
    }
    trackByFn(index, item) {
        return index;
    }
}
