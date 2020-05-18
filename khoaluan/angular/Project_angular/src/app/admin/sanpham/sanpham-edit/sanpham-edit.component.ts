import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DanhMuc } from 'src/app/models/danhmuc';
import { NhaSanXuat } from 'src/app/models/nhasanxuat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DanhmucService } from 'src/app/services/danhmuc.service';
import { NhasanxuatService } from 'src/app/services/nhasanxuat.service';
import { SanphamService } from 'src/app/services/sanpham.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SanphamListComponent } from '../sanpham-list/sanpham-list.component';
import { ImageValidator } from 'src/app/myvalidator/image.validator';
import { Sanpham } from '../../../models/sanpham';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-sanpham-edit',
    templateUrl: './sanpham-edit.component.html',
    styleUrls: ['./sanpham-edit.component.css']
})
export class SanphamEditComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    danhmucs: DanhMuc[] = this.dataDialog.danhmucs;
    nhasanxuats: NhaSanXuat[] = this.dataDialog.nhasanxuats;
    frm: FormGroup;
    error: boolean = null;
    ckeConfig = {
        customConfig: 'custom/config.js'
    };
    file: File;
    filename = '';
    sanpham: Sanpham;
    is_loading = false;
    onReady(editor) {
        editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
    }
    constructor(
        private danhmucService: DanhmucService,
        private nhasanxuatService: NhasanxuatService,
        private sanphamService: SanphamService,
        private _formBuilder: FormBuilder,
        private thongBaoService: ThongbaoService,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<SanphamListComponent>,

        @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {}
    ngOnInit() {
        this.nhasanxuatService.getAll();
        this.sanpham = this.dataDialog.sanpham;
        this.filename = this.sanpham.Hinh;
        this.loadData();
        this.createForm();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(element => element.unsubscribe());
        }
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
        this.frm = this._formBuilder.group({
            id: [this.sanpham.id, []],
            TenSanPham: [
                this.sanpham.TenSanPham,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ],
            MoTa: [this.sanpham.MoTa, [Validators.required]],
            ThongTin: [this.sanpham.ThongTin, [Validators.required]],
            idNSX: [
                Number.parseInt(this.sanpham.idNSX + ''),
                [Validators.required]
            ],
            idDanhMuc: [this.sanpham.idDanhMuc, [Validators.required]],
            Hinh: [
                this.sanpham.Hinh,
                [
                    Validators.required,
                    ImageValidator.imageSizeValidator(2000000),
                    ImageValidator.imageExtensionValidator([
                        'image/jpeg',
                        'image/png'
                    ])
                ]
            ]
        });
        this.frm.controls['Hinh'].setErrors({ '': '' });
    }
    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in this.frm.value) {
            if (
                key === 'Hinh' &&
                typeof this.frm.controls['Hinh'].value === 'string'
            ) {
            } else {
                formData.append(key, this.frm.value[key]);
            }
        }
        this.sanphamService.update(formData);
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
    onFileChange(e) {
        if (e.target.files.length > 0) {
            this.file = e.target.files[0];
            this.filename = this.file.name;
            this.frm.get('Hinh').setValue(this.file);
        }
    }
    onBack() {
        this.dialogRef.close();
    }
}
