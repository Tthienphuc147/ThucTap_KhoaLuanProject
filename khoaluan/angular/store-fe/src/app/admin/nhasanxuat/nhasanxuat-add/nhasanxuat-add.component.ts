import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResultValidatorService } from '../../../services/result-validator.service';
import { NhaSanXuat } from './../../../models/nhasanxuat';
import { NhasanxuatService } from './../../../services/nhasanxuat.service';

@Component({
    selector: 'app-nhasanxuat-add',
    templateUrl: './nhasanxuat-add.component.html',
    styleUrls: ['./nhasanxuat-add.component.css']
})
export class NhasanxuatAddComponent implements OnInit, OnDestroy {
    subcriptions: Subscription[] = [];
    frmAdd: FormGroup;
    error: boolean = null;
    is_loading = false;
    constructor(
        private nhasanxuatService: NhasanxuatService,
        private resultValidatorService: ResultValidatorService,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dataReturn: NhaSanXuat
    ) {}
    ngOnInit() {
        this.createForm();
        this.loadData();
    }
    loadData() {
        this.subcriptions.push(
            this.nhasanxuatService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frmAdd = this._formBuilder.group({
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
        this.nhasanxuatService.createNew(this.frmAdd.value);
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
    ngOnDestroy() {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => e.unsubscribe());
        }
    }
}
