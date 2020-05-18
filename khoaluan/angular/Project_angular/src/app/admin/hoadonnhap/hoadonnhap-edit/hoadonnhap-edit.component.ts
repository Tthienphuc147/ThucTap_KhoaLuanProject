import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HoaDonNhap } from 'src/app/models/hoadonnhap';
import { NhaCungCap } from 'src/app/models/nhacungcap';
import { HoadonnhapService } from 'src/app/services/hoadonnhap.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { NhaCungCapService } from '../../../services/nhacungcap.service';
import { HoadonnhapListComponent } from '../hoadonnhap-list/hoadonnhap-list.component';

@Component({
    selector: 'app-hoadonnhap-edit',
    templateUrl: './hoadonnhap-edit.component.html',
    styleUrls: ['./hoadonnhap-edit.component.css']
})
export class HoadonnhapEditComponent implements OnInit, OnDestroy {
    subcriptions: Subscription[] = [];
    hoadonnhaps: HoaDonNhap[] = [];
    hoadonnhap: HoaDonNhap;
    nhacungcaps: NhaCungCap[] = [];
    frm: FormGroup;
    is_loading = false;
    constructor(
        private hoadonnhapService: HoadonnhapService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<HoadonnhapListComponent>,
        private datePipe: DatePipe,
        private nhacungcapService: NhaCungCapService,
        @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {}
    ngOnInit() {
        this.nhacungcapService.getAll();
        this.hoadonnhap = this.dataDialog.hoadonnhap;
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
            id: [this.hoadonnhap.id],
            idUser: [this.hoadonnhap.idUser],
            NgayNhap: [],
            idNCC: [this.hoadonnhap.idNCC, [Validators.required]]
        });
    }
    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        for (const key in this.frm.value) {
            if (key === 'NgayNhap') {
                if (this.frm.value['NgayNhap'] !== null) {
                    this.frm.value[key] = this.datePipe.transform(
                        this.frm.controls[key].value,
                        'dd-MM-yyyy'
                    );
                } else {
                    this.frm.value[key] = this.datePipe.transform(
                        this.hoadonnhap.NgayNhap,
                        'dd-MM-yyyy'
                    );
                }
            }
            formData.append(key, this.frm.value[key]);
        }
        this.hoadonnhapService.update(formData);
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
