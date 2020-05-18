import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NhaCungCap } from '../../../models/nhacungcap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NhaCungCapService } from '../../../services/nhacungcap.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NhacungcapAddComponent } from '../nhacungcap-add/nhacungcap-add.component';
import { ResultValidatorService } from '../../../services/result-validator.service';

@Component({
    selector: 'app-nhacungcap-edit',
    templateUrl: './nhacungcap-edit.component.html',
    styleUrls: ['./nhacungcap-edit.component.css']
})
export class NhacungcapEditComponent implements OnInit, OnDestroy {
    subcriptions: Subscription[] = [];
    frmEdit: FormGroup;
    is_loading = false;
    constructor(
        private nhaCungCapService: NhaCungCapService,
        private resultValidatorService: ResultValidatorService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<NhacungcapAddComponent>,
        @Inject(MAT_DIALOG_DATA) public dataReturn: NhaCungCap
    ) {}
    ngOnInit() {
        this.createForm();
        this.loadData();
    }
    loadData() {
        this.subcriptions.push(
            this.nhaCungCapService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frmEdit = this._formBuilder.group({
            id: [this.dataReturn.id],
            Ten: [
                this.dataReturn.Ten,
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(2),
                    Validators.pattern(
                        '[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*'
                    )
                ]
            ]
        });
    }
    onSubmitForm() {
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in this.frmEdit.value) {
            formData.append(key, this.frmEdit.value[key]);
        }
        this.nhaCungCapService.update(formData);
    }
    ngOnDestroy() {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => e.unsubscribe());
        }
    }
    onReset() {
        this.frmEdit.controls['Ten'].setValue(this.dataReturn.Ten);
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
