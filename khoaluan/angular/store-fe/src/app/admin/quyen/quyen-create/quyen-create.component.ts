import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quyen } from '../../../models/quyen';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuyenService } from '../../../services/quyen.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { QuyenListComponent } from '../quyen-list/quyen-list.component';
@Component({
    selector: 'app-quyen-create',
    templateUrl: './quyen-create.component.html',
    styleUrls: ['./quyen-create.component.css']
})
export class QuyenCreateComponent implements OnInit, OnDestroy {
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
        this.createForm();
        this.loadData();
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
            Ten: [
                '',
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
        this.quyenService.createNew(this.frm.value);
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
