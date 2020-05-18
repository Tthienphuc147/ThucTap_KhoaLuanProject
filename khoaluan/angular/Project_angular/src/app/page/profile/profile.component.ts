import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DiaDiem } from '../../models/diadiem';
import { HoaDonXuat } from '../../models/hoadonxuat';
import { User } from '../../models/user';
import { DiadiemService } from '../../services/diadiem.service';
import { DialogService } from '../../services/dialog.service';
import { HoadonxuatService } from '../../services/hoadonxuat.service';
import { LoginService } from '../../services/login.service';
import { TrangthaiService } from '../../services/trangthai.service';
import { UserService } from '../../services/user.service';
import { ChitietdonhangComponent } from './chitietdonhang/chitietdonhang.component';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    api_url = environment.api_img;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    isShow = true;
    currentUser: User;
    frm: FormGroup;
    quans: DiaDiem[] = [];
    phuongs: DiaDiem[] = [];
    subscriptions: Subscription[] = [];
    hoadonxuats: HoaDonXuat[] = [];

    constructor(
        private loginService: LoginService,
        private _formBuilder: FormBuilder,
        private diadiemService: DiadiemService,
        private userService: UserService,
        public dialog: MatDialog,
        private dialogService: DialogService,
        private profileSevice: ProfileService
    ) {}

    ngOnInit() {
        this.diadiemService.getAll();
        this.loadData();
        this.createForm();
    }
    loadData() {
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                if (data) {
                    this.currentUser = data;
                    const formData = new FormData();
                    formData.append('idUser', data.id + '');
                    this.profileSevice.fetchExportOrder(formData);
                }
            }),
            this.diadiemService.DiaDiemSubject.subscribe(data => {
                if (data.length > 0) {
                    this.quans = this.currentUser.idDiaDiem
                        ? this.getDongCap(
                              this.getDiaDiem(
                                  this.getDiaDiem(this.currentUser.idDiaDiem)
                                      .idParent
                              )
                          )
                        : null;
                    this.phuongs = this.currentUser.idDiaDiem
                        ? this.getDongCap(
                              this.getDiaDiem(this.currentUser.idDiaDiem)
                          )
                        : null;
                }
            })
        );
    }
    onShowDonHang(e) {
        this.dialog.open(ChitietdonhangComponent, {
            width: '600px',
            data: e,
            autoFocus: true,
            panelClass: 'filter-popup'
        });
    }
    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.currentUser.id],
            Ten: [
                { value: this.currentUser.Ten, disabled: this.isShow },
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),
                    Validators.pattern('[a-zA-Z1-9 ]*')
                ]
            ],
            email: [{ value: this.currentUser.email, disabled: this.isShow }],
            DienThoai: [
                { value: this.currentUser.DienThoai, disabled: this.isShow }
            ],
            DiaChi: [{ value: this.currentUser.DiaChi, disabled: this.isShow }],
            idDiaDiem: [
                {
                    value: Number.parseInt(this.currentUser.idDiaDiem + ''),
                    disabled: this.isShow
                }
            ]
        });
    }
    onToggleShow() {
        this.isShow = !this.isShow;
        if (!this.isShow) {
            this.frm.controls['Ten'].enable();
            this.frm.controls['DienThoai'].enable();
            this.frm.controls['DiaChi'].enable();
            this.frm.controls['idDiaDiem'].enable();
        } else {
            this.frm.controls['Ten'].disable();
            this.frm.controls['DienThoai'].disable();
            this.frm.controls['DiaChi'].disable();
            this.frm.controls['idDiaDiem'].disable();
        }
    }
    onSubmitForm() {
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in this.frm.value) {
            formData.append(key, this.frm.value[key]);
        }
        this.subscriptions.push(
            this.userService.update(formData).subscribe(
                data => {
                    this.onToggleShow();
                },
                err => {}
            )
        );
    }
    onChangeHinh(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const formdata = new FormData();
            formdata.append('_method', 'put');
            formdata.append('id', this.currentUser.id + '');
            formdata.append('Hinh', file);
            this.userService.update_hinh(formdata).subscribe(data => {
                this.loginService.updateUser(data);
            });
        }
    }
    onDoiMatKhau() {
        this.dialogService.showDoiMatKhau();
    }
    getThanhPhos() {
        return this.diadiemService.getThanhPhos();
    }
    getDongCap(item: DiaDiem): DiaDiem[] {
        return this.diadiemService.getDongCap(item);
    }
    getParent(item: DiaDiem): DiaDiem {
        return item ? this.diadiemService.getParent(item) : null;
    }
    getDiaDiem(id: number): DiaDiem {
        return this.diadiemService.getDiaDiem_by_id(id);
    }
    onChangeThanhPho(e) {
        this.quans = this.diadiemService.onChangeThanhPho(e);
    }
    onChangeQuan(e) {
        this.phuongs = this.diadiemService.onChangeQuan(e);
    }
}
