import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DanhMuc } from 'src/app/models/danhmuc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NhaSanXuat } from '../../../models/nhasanxuat';
import { DanhmucService } from 'src/app/services/danhmuc.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SanphamListComponent } from '../sanpham-list/sanpham-list.component';
import { SanphamService } from '../../../services/sanpham.service';
import { ImageValidator } from '../../../myvalidator/image.validator';
import { environment } from '../../../../environments/environment';
import { NhasanxuatService } from '../../../services/nhasanxuat.service';

@Component({
    selector: 'app-sanpham-create',
    templateUrl: './sanpham-create.component.html',
    styleUrls: ['./sanpham-create.component.css']
})
export class SanphamCreateComponent implements OnInit, OnDestroy {
    api_url = environment.api_img;
    subscriptions: Subscription[] = [];
    danhmucs: DanhMuc[];
    nhasanxuats: NhaSanXuat[];
    frmAdd: FormGroup;
    file: File;
    filename = '';
    ckeConfig: any;
    is_loading = false;
    constructor(
        private nhasanxuatService: NhasanxuatService,
        private danhmucService: DanhmucService,
        private sanphamService: SanphamService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<SanphamListComponent>
    ) {}
    loadEditor() {
        this.ckeConfig = {
            customConfig: 'custom/config.js'
        };
    }
    ngOnInit() {
        this.nhasanxuatService.getAll();
        this.loadData();
        this.loadEditor();
        this.createForm();
    }
    loadData() {
        this.subscriptions.push(
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                },
                () => {}
            ),
            this.nhasanxuatService.itemsObs.subscribe(data => {
                this.nhasanxuats = data;
            }),
            this.sanphamService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frmAdd = this._formBuilder.group({
            TenSanPham: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),
                ]
            ],
            MoTa: ['', [Validators.required]],
            ThongTin: ['', [Validators.required]],
            idNSX: ['', [Validators.required]],
            idDanhMuc: ['', [Validators.required]],
            Hinh: [
                '',
                [
                    Validators.required,
                    ImageValidator.imageSizeValidator(2000000),
                    ImageValidator.imageExtensionValidator([
                        'image/jpeg',
                        'image/png',
                        'image/webp'
                    ])
                ]
            ]
        });
    }

    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        for (const key in this.frmAdd.value) {
            formData.append(key, this.frmAdd.value[key]);
        }
        this.sanphamService.createNew(formData);
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(element => element.unsubscribe());
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
    onFileChange(e) {
        if (e.target.files.length > 0) {
            this.file = e.target.files[0];
            this.filename = this.file.name;
            this.frmAdd.get('Hinh').setValue(this.file);
        }
    }
    onBack() {
        this.dialogRef.close();
    }
}
