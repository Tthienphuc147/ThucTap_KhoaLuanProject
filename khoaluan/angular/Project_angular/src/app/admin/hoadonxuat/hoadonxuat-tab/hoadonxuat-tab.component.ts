import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiaDiem } from 'src/app/models/diadiem';
import { HoaDonXuat } from 'src/app/models/hoadonxuat';
import { TrangThai } from 'src/app/models/trangthai';
import { User } from 'src/app/models/user';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { HoadonxuatService } from 'src/app/services/hoadonxuat.service';
import { TrangthaiService } from 'src/app/services/trangthai.service';
import { BaocaoService } from '../../../services/baocao.service';

@Component({
    selector: 'app-hoadonxuat-tab',
    templateUrl: './hoadonxuat-tab.component.html',
    styleUrls: ['./hoadonxuat-tab.component.css']
})
export class HoadonxuatTabComponent implements OnInit, OnDestroy {
    is_loading = false;
    @Input() idtab: number;
    expand = false;
    columnsToDisplay = [];
    hoadonxuats: HoaDonXuat[] = [];
    users: User[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    diadiems: DiaDiem[] = [];
    trangthais: TrangThai[] = [];
    loadDislayColumn() {
        const arrayHeader1 = [
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
        ];
        const arrayHeader2 =
            this.idtab === 5
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
                      'updated_at',
                      'action'
                  ];
        this.columnsToDisplay = this.expand ? arrayHeader1 : arrayHeader2;
    }

    constructor(
        private trangthaiService: TrangthaiService,
        private hoadonxuatService: HoadonxuatService,
        public dialog: MatDialog,
        private router: Router,
        private confirmDialogService: ConfirmDialogService,
        private baocaoService: BaocaoService
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.loadData();
    }
    onDetail(e) {
        this.router.navigate(['admin/hoadonnhap', e.id, 'detail']);
    }
    loadData() {
        this.loadDislayColumn();
        this.subscriptions.push(
            this.hoadonxuatService.itemsObs.subscribe(
                data => {
                    if (data.length > 0) {
                        this.hoadonxuats = data.filter(e => {
                            return e.idTrangThai === this.idtab;
                        });
                        this.dataSource = new MatTableDataSource<HoaDonXuat>(
                            this.hoadonxuats
                        );
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
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
                this.is_loading = data;
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

    onChangeTrangThai(item) {
        const formdata = new FormData();
        formdata.append('_method', 'put');
        for (const key in item) {
            formdata.append(key, item[key]);
        }
        this.hoadonxuatService.update(formdata);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.loadDislayColumn();
    }
    onEdit(data) {
        this.router.navigate(['admin/hoadonxuat', data.id, 'edit']);
    }
    trackByFn(index, item) {
        return index;
    }
}
