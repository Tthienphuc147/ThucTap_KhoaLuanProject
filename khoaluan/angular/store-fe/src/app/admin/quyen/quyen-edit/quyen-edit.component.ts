import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuyenService } from '../../../services/quyen.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QuyenListComponent } from '../quyen-list/quyen-list.component';
import { Quyen } from 'src/app/models/quyen';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-quyen-edit',
    templateUrl: './quyen-edit.component.html',
    styleUrls: ['./quyen-edit.component.css']
})
export class QuyenEditComponent implements OnInit, OnDestroy {
    is_loading = false;
    subscriptions: Subscription[] = [];
    Quyen: Quyen = null;
    frm: FormGroup;
    constructor(
        private quyenService: QuyenService,
        private resultValidatorService: ResultValidatorService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<QuyenListComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: Quyen
    ) {}
    ngOnInit() {
        this.Quyen = this.dataDialog;
        this.createForm();
    }
    loadData() {
        this.subscriptions.push(
            this.quyenService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.Quyen.id],
            Ten: [
                this.Quyen.Ten,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),
                    Validators.pattern(
                        '[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*'
                    )
                ]
            ]
        });
    }
    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in this.frm.value) {
            formData.append(key, this.frm.value[key]);
        }
        this.quyenService.update(formData);
    }
    onReset() {
        this.frm.controls['Ten'].setValue(this.Quyen.Ten);
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
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
}
