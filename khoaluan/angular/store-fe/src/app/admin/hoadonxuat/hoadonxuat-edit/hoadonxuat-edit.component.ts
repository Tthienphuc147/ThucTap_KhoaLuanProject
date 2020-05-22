import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HoaDonXuat } from 'src/app/models/hoadonxuat';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HoadonxuatService } from '../../../services/hoadonxuat.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { ActivatedRoute } from '@angular/router';
import { ChitiethoadonxuatService } from '../../../services/chitiethoadonxuat.service';
import { ChiTietHoaDonXuat } from '../../../models/chitiethoadonxuat';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Sanpham } from '../../../models/sanpham';
import { User } from '../../../models/user';
import { SanphamService } from '../../../services/sanpham.service';
import { UserService } from '../../../services/user.service';
import { TrangThai } from 'src/app/models/trangthai';
import { TrangthaiService } from 'src/app/services/trangthai.service';
import { DiaDiem } from '../../../models/diadiem';
import { DiadiemService } from '../../../services/diadiem.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-hoadonxuat-edit',
    templateUrl: './hoadonxuat-edit.component.html',
    styleUrls: ['./hoadonxuat-edit.component.css'],
    providers: [CurrencyPipe]
})
export class HoadonxuatEditComponent implements OnInit, OnDestroy {
    api_url = environment.api_img;
    title = 'Chi tiết hóa đơn';
    readonly = true;
    expand = false;
    trangthais: TrangThai[] = [];
    subscriptions: Subscription[] = [];
    hoadonxuat: any = null;
    frm: FormGroup;
    dataSource;
    isLoading = false;
    chitiethoadonxuats: any[] = [];
    columnsToDisplay = [];
    sanphams: Sanpham[] = [];
    users: User[] = [];
    diadiems: DiaDiem[] = [];
    thanhphos: DiaDiem[] = [];
    quans: DiaDiem[] = [];
    phuongs: DiaDiem[] = [];
    thanhpho: DiaDiem;
    quan: DiaDiem;
    phuong: DiaDiem;
    isCancel = false;
    constructor(
        private datePipe: DatePipe,
        private diadiemService: DiadiemService,
        private trangthaiService: TrangthaiService,
        private sanphamService: SanphamService,
        private userService: UserService,
        private chitiethoadonxuatService: ChitiethoadonxuatService,
        private hoadonxuatService: HoadonxuatService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        private activateRouteService: ActivatedRoute,
        public dialog: MatDialog
    ) {}
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    ngOnInit() {
        this.hoadonxuatService.referById(
            this.activateRouteService.params['value'].id
        );
        this.diadiemService.getAll();
        this.loadDislayColumn();
        this.createForm();
        this.loadData();
    }
    loadDislayColumn() {
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'Hinh',
                  'idSanPham',
                  'DonGia',
                  'SoLuong',
                  'MaDotNhap',
                  'idHDX',
                  'created_at',
                  'updated_at'
              ]
            : ['id', 'Hinh', 'idSanPham', 'DonGia', 'SoLuong'];
    }

    getThanhPhos() {
        this.thanhphos = this.diadiems
            .filter(data => {
                return data.idParent == null;
            })
            .slice();
    }
    getThanhPho() {
        if (this.quan) {
            this.thanhpho = this.diadiems
                .filter(data => {
                    return data.id === this.quan.idParent;
                })
                .slice()[0];
            this.quans = this.diadiems.filter(data => {
                return data.idParent === this.quan.idParent;
            });
        }
    }
    getQuan() {
        if (this.phuong) {
            this.quan = this.diadiems
                .filter(data => {
                    return data.id === this.phuong.idParent;
                })
                .slice()[0];
            this.phuongs = this.diadiems
                .filter(data => {
                    return data.idParent === this.phuong.idParent;
                })
                .slice();
        }
    }
    getPhuong() {
        if (this.hoadonxuat) {
            this.phuong = this.diadiems
                .filter(data => {
                    return data.id === this.hoadonxuat.idDiaDiem;
                })
                .slice()[0];
        }
    }
    onChangeThanhPho(id: number) {
        this.quans = this.diadiems
            .filter(data => {
                return data.idParent === id;
            })
            .slice();
    }
    onChangeQuan(id: number) {
        this.phuongs = this.diadiems.filter(data => {
            return data.idParent === id;
        });
    }
    onSave() {
        const formData = new FormData();
        for (const key in this.frm.value) {
            formData.append(key, this.frm.value[key]);
        }
        this.hoadonxuatService.update(formData);
        this.onChangeReadonly();
    }
    loadData() {
        this.subscriptions.push(
            this.hoadonxuatService.itemObs.subscribe(
                data => {
                    this.hoadonxuat = data;
                    this.createForm();
                },
                () => {}
            ),
            this.hoadonxuatService.detailObs.subscribe(data => {
                if (data) {
                    this.chitiethoadonxuats = data.slice();
                    this.dataSource = new MatTableDataSource<any>(
                        this.chitiethoadonxuats
                    );
                    this.dataSource.sort = this.sort;
                }
            }),
            this.trangthaiService.currentTrangThai.subscribe(
                data => {
                    this.trangthais = data;
                },
                () => {}
            ),
            this.diadiemService.currentDiaDiem.subscribe(
                data => {
                    this.diadiems = data;
                    this.getPhuong();
                    this.getQuan();
                    this.getThanhPho();
                    this.getThanhPhos();
                },
                () => {}
            )
        );
    }
    onChangeReadonly() {
        this.readonly = !this.readonly;
        this.readonly
            ? // tslint:disable-next-line:ban-comma-operator
              (this.frm.controls['idTrangThai'].disable(),
              this.frm.controls['idDiaDiem'].disable())
            : // tslint:disable-next-line:ban-comma-operator
              (this.frm.controls['idTrangThai'].enable(),
              this.frm.controls['idDiaDiem'].enable());
    }
    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.hoadonxuat ? this.hoadonxuat.id : ''],
            idUser: [this.hoadonxuat ? this.hoadonxuat.idUser : ''],
            TongTien: [this.hoadonxuat ? this.hoadonxuat.total : ''],
            NguoiNhan: [this.hoadonxuat ? this.hoadonxuat.NguoiNhan : ''],
            DiaChi: [this.hoadonxuat ? this.hoadonxuat.DiaChi : ''],
            DienThoai: [this.hoadonxuat ? this.hoadonxuat.DienThoai : ''],
            idTrangThai: [
                {
                    value: this.hoadonxuat ? this.hoadonxuat.idTrangThai : '',
                    disabled: this.readonly
                }
            ],
            idDiaDiem: [
                {
                    value: this.hoadonxuat ? this.hoadonxuat.idDiaDiem : '',
                    disabled: this.readonly
                },
                []
            ],
            LiDo: [this.hoadonxuat ? this.hoadonxuat.LiDo : ''],
            updated_at: [this.hoadonxuat ? this.hoadonxuat.updated_at : '']
        });
    }
    onDelete(e: ChiTietHoaDonXuat) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: 'Bạn muốn xóa ?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.chitiethoadonxuatService.delete(e);
                this.hoadonxuatService.referById(
                    this.activateRouteService.params['value'].id
                );
            }
        });
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }

    onValidator(controlName: string, status?: boolean) {
        return this.resultValidatorService.getResult(
            controlName,
            this.frm,
            status
        );
    }
    onValidatorBorderColor(controlName: string) {
        return this.resultValidatorService.getBorderColor(
            controlName,
            this.frm
        );
    }
    onValidatorTextColor(controlName: string) {
        return this.resultValidatorService.getTextColor(controlName, this.frm);
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
                  'updated_at'
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
                  'LiDo'
              ];
    }
}
