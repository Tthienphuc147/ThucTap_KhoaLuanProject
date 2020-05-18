import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HoaDonXuat } from 'src/app/models/hoadonxuat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { DiaDiem } from 'src/app/models/diadiem';
import { TrangThai } from 'src/app/models/trangthai';
import { BaocaoService } from 'src/app/services/baocao.service';
import { DatePipe } from '@angular/common';
import { TrangthaiService } from 'src/app/services/trangthai.service';
import { DiadiemService } from 'src/app/services/diadiem.service';
import { UserService } from 'src/app/services/user.service';
import { HoadonxuatService } from '../../../services/hoadonxuat.service';

@Component({
    selector: 'app-baocao-donhang',
    templateUrl: './baocao-donhang.component.html',
    styleUrls: ['./baocao-donhang.component.css']
})
export class BaocaoDonhangComponent implements OnInit, OnDestroy {
    @Input() thugon: boolean;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    isLoading = false;
    tungay: Date;
    denngay: Date;
    subscriptions: Subscription[] = [];
    columnsToDisplay = [];
    expand = false;
    hoadonxuats: any[] = [];
    frmBaoCao1: FormGroup;
    dataSource: any;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    users: User[] = [];
    diadiems: DiaDiem[] = [];
    trangthais: TrangThai[] = [];
    total = 0;
    constructor(
        private baocaoService: BaocaoService,
        private datePipe: DatePipe,
        private trangthaiService: TrangthaiService,
        private diadiemService: DiadiemService,
        private userService: UserService,
        private _formBuilder: FormBuilder,
        private hoadonxuatService: HoadonxuatService
    ) {}

    ngOnInit() {
        this.isLoading = true;
        this.loadData();
        this.createForm();
    }
    createForm() {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.frmBaoCao1 = this._formBuilder.group({
            NgayBD: [firstDay, [Validators.required]],
            NgayKT: [lastDay, [Validators.required]]
        });
        this.onBaoCao();
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
        const arrayHeader2 = [
            'id',
            'NguoiNhan',
            'DienThoai',
            'TongTien',
            'created_at'
        ];
        this.columnsToDisplay = this.expand ? arrayHeader1 : arrayHeader2;
    }
    loadData() {
        this.isLoading = true;
        this.loadDislayColumn();

        this.isLoading = false;
    }
    onBaoCao() {
        const formData = new FormData();
        formData.append(
            'NgayBD',
            this.datePipe.transform(
                this.frmBaoCao1.value['NgayBD'],
                'dd-MM-yyyy'
            )
        );
        formData.append(
            'NgayKT',
            this.datePipe.transform(
                this.frmBaoCao1.value['NgayKT'],
                'dd-MM-yyyy'
            )
        );
        this.isLoading = true;
        this.subscriptions.push(
            this.baocaoService
                .getbaocao_donhang(formData)
                .subscribe(
                    data => {
                        if (data) {
                            this.hoadonxuats = data;
                            this.dataSource = new MatTableDataSource<any>(
                                this.hoadonxuats
                            );
                            this.total = this.hoadonxuats.reduce(
                                (tong, item) => {
                                    return (tong += item.total);
                                },
                                0
                            );
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                        }
                    },
                    () => {}
                )
                .add(() => (this.isLoading = false))
        );
    }

    getTotal() {
        return this.total;
    }
}
