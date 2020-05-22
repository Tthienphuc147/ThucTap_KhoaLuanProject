import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DanhmuchinhService } from 'src/app/services/danhmuchinh.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { DanhmuchinhListComponent } from '../danhmuchinh-list/danhmuchinh-list.component';
import { ImageValidator } from 'src/app/myvalidator/image.validator';
import { DanhMucHinh } from '../../../models/danhmuchinh';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-danhmuchinh-edit',
    templateUrl: './danhmuchinh-edit.component.html',
    styleUrls: ['./danhmuchinh-edit.component.css']
})
export class DanhmuchinhEditComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    danhmuchinhs: DanhMucHinh[] = [];
    frm: FormGroup;
    sanphams = [];
    danhmuchinh: DanhMucHinh;
    filename = '';
    file: File;
    is_loading = false;
    constructor(
        private danhmuchinhService: DanhmuchinhService,
        private _formBuilder: FormBuilder,
        private thongBaoService: ThongbaoService,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<DanhmuchinhListComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {}
    ngOnInit() {
        this.sanphams = this.dataDialog.sanphams;
        this.danhmuchinh = this.dataDialog.danhmuchinh;
        this.filename = this.danhmuchinh.Hinh;
        this.createForm();
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.danhmuchinhService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.danhmuchinh.id, []],
            Hinh: [
                this.danhmuchinh.Hinh,
                [
                    Validators.required,
                    ImageValidator.imageSizeValidator(2000000),
                    ImageValidator.imageExtensionValidator([
                        'image/jpeg',
                        'image/png'
                    ])
                ]
            ],
            idSanPham: [this.danhmuchinh.idSanPham, []]
        });
    }
    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        for (const key in this.frm.value) {
            if (
                key === 'Hinh' &&
                typeof this.frm.controls['Hinh'].value === 'string'
            ) {
            } else {
                formData.append(key, this.frm.value[key]);
            }
        }
        this.danhmuchinhService.update(formData);
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
        }
    }
    onFileChange(e) {
        if (e.target.files.length > 0) {
            this.file = e.target.files[0];
            this.filename = this.file.name;
            this.frm.get('Hinh').setValue(this.file);
        }
    }
    onReset() {
        this.frm.controls['id'].setValue(this.danhmuchinh.id);
        this.frm.controls['idSanPham'].setValue(this.danhmuchinh.idSanPham);
        this.frm.controls['Hinh'].setValue(this.danhmuchinh.Hinh);
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
