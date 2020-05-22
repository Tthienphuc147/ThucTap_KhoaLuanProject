import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { HoaDonNhap } from '../../../models/hoadonnhap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HoadonnhapService } from '../../../services/hoadonnhap.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HoadonnhapListComponent } from '../hoadonnhap-list/hoadonnhap-list.component';
import { NhaCungCap } from '../../../models/nhacungcap';
import { NhaCungCapService } from '../../../services/nhacungcap.service';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-hoadonnhap-create',
    templateUrl: './hoadonnhap-create.component.html',
    styleUrls: ['./hoadonnhap-create.component.css']
})
export class HoadonnhapCreateComponent implements OnInit, OnDestroy {
    subcriptions: Subscription[] = [];
    hoadonnhaps: HoaDonNhap[] = [];
    nhacungcaps: NhaCungCap[] = [];
    user: User;
    frm: FormGroup;
    is_loading = false;
    constructor(
        private hoadonnhapService: HoadonnhapService,
        private loginService: LoginService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<HoadonnhapListComponent>,
        private datePipe: DatePipe,
        private nhacungcapService: NhaCungCapService
    ) {}
    ngOnInit() {
        this.nhacungcapService.getAll();
        this.user = this.loginService.currentUserValue;
        this.createForm();
        this.loadData();
    }
    loadData() {
        this.subcriptions.push(
            this.hoadonnhapService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            }),
            this.nhacungcapService.itemsObs.subscribe(
                data => {
                    this.nhacungcaps = data;
                },
                () => {}
            )
        );
    }
    createForm() {
        this.frm = this._formBuilder.group({
            idUser: [this.user.id],
            NgayNhap: ['', [Validators.required]],
            idNCC: ['', [Validators.required]]
        });
    }
    onSubmitForm() {
        const formData = new FormData();
        for (const key in this.frm.value) {
            if (key === 'NgayNhap') {
                this.frm.value[key] = this.datePipe.transform(
                    this.frm.controls[key].value,
                    'dd-MM-yyyy'
                );
            }
            formData.append(key, this.frm.value[key]);
        }
        this.hoadonnhapService.createNew(formData);
    }
    ngOnDestroy() {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => {
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
}
