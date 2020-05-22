import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DanhmucListComponent } from '../danhmuc-list/danhmuc-list.component';
import { DanhMuc } from '../../../models/danhmuc';
import { DanhmucService } from '../../../services/danhmuc.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from '../../../services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'app-danhmuc-edit',
    templateUrl: './danhmuc-edit.component.html',
    styleUrls: ['./danhmuc-edit.component.css']
})
export class DanhmucEditComponent implements OnInit, OnDestroy {
    is_loading = false;
    public danhmuc: DanhMuc;
    public subscriptions: Subscription[] = [];
    public danhmucs: DanhMuc[] = [];
    public frmEdit: FormGroup;
    constructor(
        private danhmucService: DanhmucService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<DanhmucListComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: DanhMuc
    ) {}
    ngOnInit() {
        this.danhmuc = this.dataDialog;
        this.createForm();
        this.subscriptions.push(
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                },
                () => {}
            ),
            this.danhmucService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frmEdit = this._formBuilder.group({
            id: [this.danhmuc.id],
            Ten: [
                this.danhmuc.Ten,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ],
            idParent: [this.danhmuc.idParent, []],
            Hinh: [
                this.danhmuc.Hinh,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ]
        });
    }
    onSubmitForm() {
        const formData = new FormData();
        const array = this.frmEdit.value;
        for (const key in array) {
            formData.append(key, array[key]);
        }
        this.danhmucService.update(formData);
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    onValidator(controlName: string, status?: boolean) {
        return this.resultValidatorService.getResult(
            controlName,
            this.frmEdit,
            status
        );
    }
    onValidatorBorderColor(controlName: string) {
        return this.resultValidatorService.getBorderColor(
            controlName,
            this.frmEdit
        );
    }
    onValidatorTextColor(controlName: string) {
        return this.resultValidatorService.getTextColor(
            controlName,
            this.frmEdit
        );
    }
}
