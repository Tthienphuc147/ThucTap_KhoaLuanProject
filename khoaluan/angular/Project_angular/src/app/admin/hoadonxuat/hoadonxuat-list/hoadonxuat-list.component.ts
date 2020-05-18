import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HoaDonXuat } from '../../../models/hoadonxuat';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { HoadonxuatService } from '../../../services/hoadonxuat.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { DiaDiem } from '../../../models/diadiem';
import { DiadiemService } from '../../../services/diadiem.service';
import { TrangThai } from '../../../models/trangthai';
import { TrangthaiService } from '../../../services/trangthai.service';

@Component({
    selector: 'app-hoadonxuat-list',
    templateUrl: './hoadonxuat-list.component.html',
    styleUrls: ['./hoadonxuat-list.component.css']
})
export class HoadonxuatListComponent implements OnInit, OnDestroy {
    title = 'HÓA ĐƠN XUẤT';
    expand = false;
    columnsToDisplay = this.expand
        ? [
              'id',
              'NguoiNhan',
              'DienThoai',
              'TongTien',
              'DiaChi',
              'idDiaDiem',
              'idUser',
              'idTrangThai',
              'LiDo',
              'created_at',
              'updated_at',
              'action'
          ]
        : [
              'id',
              'NguoiNhan',
              'DienThoai',
              'TongTien',
              'DiaChi',
              'idDiaDiem',
              'idUser',
              'idTrangThai',
              'LiDo',
              'action'
          ];
    hoadonxuats: HoaDonXuat[] = [];
    users: User[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    diadiems: DiaDiem[] = [];
    trangthais: TrangThai[] = [];
    constructor(
        private trangthaiService: TrangthaiService,
        private diadiemService: DiadiemService,
        private userService: UserService,
        private hoadonxuatService: HoadonxuatService,
        public dialog: MatDialog,
        private router: Router,
        private confirmDialogService: ConfirmDialogService
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.hoadonxuatService.getAll();
        this.loadData();
    }
    onDetail(e) {
        this.router.navigate(['admin/hoadonnhap', e.id, 'detail']);
    }
    loadData() {
        this.subscriptions.push(
            this.hoadonxuatService.itemsObs
                .subscribe(
                    data => {
                        if (data) {
                            this.hoadonxuats = data;
                            this.dataSource = new MatTableDataSource<
                                HoaDonXuat
                            >(this.hoadonxuats);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                            this.isLoading = false;
                        }
                    },
                    () => {}
                )
                .add(() => {}),
            this.userService.currentUser.subscribe(
                data => {
                    this.users = data;
                },
                () => {}
            ),
            this.diadiemService.currentDiaDiem.subscribe(
                data => {
                    this.diadiems = data;
                },
                () => {}
            ),
            this.trangthaiService.currentTrangThai.subscribe(
                data => {
                    this.trangthais = data;
                },
                () => {}
            ),
            this.hoadonxuatService.isLoadingObs.subscribe(data => {
                this.isLoading = data;
            })
        );
    }
    findUser(id: number) {
        return this.users.filter(data => {
            return data.id === id;
        })[0];
    }
    findDiaDiem(id: number) {
        return this.diadiems.filter(data => {
            return data.id === id;
        })[0];
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
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'NguoiNhan',
                  'DienThoai',
                  'TongTien',
                  'DiaChi',
                  'idDiaDiem',
                  'idUser',
                  'idTrangThai',
                  'LiDo',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : [
                  'id',
                  'NguoiNhan',
                  'DienThoai',
                  'TongTien',
                  'DiaChi',
                  'idDiaDiem',
                  'idUser',
                  'idTrangThai',
                  'LiDo',
                  'action'
              ];
    }
}
