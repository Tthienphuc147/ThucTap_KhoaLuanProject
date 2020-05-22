import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DanhMucHinh } from '../../../models/danhmuchinh';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DanhmuchinhService } from 'src/app/services/danhmuchinh.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DanhmuchinhListComponent } from '../danhmuchinh-list/danhmuchinh-list.component';
import { ImageValidator } from 'src/app/myvalidator/image.validator';
import { SanphamService } from 'src/app/services/sanpham.service';

@Component({
    selector: 'app-danhmuchinh-create',
    templateUrl: './danhmuchinh-create.component.html',
    styleUrls: ['./danhmuchinh-create.component.css']
})
export class DanhmuchinhCreateComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    danhmuchinhs: DanhMucHinh[] = [];
    frmAdd: FormGroup;
    sanphams = [];
    filename = '';
    file: File;
    is_loading = false;
    constructor(
        private danhmuchinhService: DanhmuchinhService,
        private _formBuilder: FormBuilder,
        private thongBaoService: ThongbaoService,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<DanhmuchinhListComponent>,
        @Inject(MAT_DIALOG_DATA) public dataReturn: any
    ) {}
    ngOnInit() {
        this.sanphams = this.dataReturn.sanphams;
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
        this.frmAdd = this._formBuilder.group({
            Hinh: [
                '',
                [
                    Validators.required,
                    ImageValidator.imageSizeValidator(2000000),
                    ImageValidator.imageExtensionValidator([
                        'image/jpeg',
                        'image/png'
                    ])
                ]
            ],
            idSanPham: ['', [Validators.required]]
        });
    }
    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        for (const key in this.frmAdd.value) {
            formData.append(key, this.frmAdd.value[key]);
        }
        this.danhmuchinhService.createNew(formData);
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
            this.frmAdd.get('Hinh').setValue(this.file);
        }
    }
    onValidator(controlName: string, status?: boolean) {
        return this.resultValidatorService.getResult(
            controlName,
            this.frmAdd,
            status
        );
    }
    onValidatorBorderColor(controlName: string) {
        return this.resultValidatorService.getBorderColor(
            controlName,
            this.frmAdd
        );
    }
    onValidatorTextColor(controlName: string) {
        return this.resultValidatorService.getTextColor(
            controlName,
            this.frmAdd
        );
    }
}
