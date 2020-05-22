import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NhaCungCapService } from '../../../services/nhacungcap.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NhaCungCap } from '../../../models/nhacungcap';
import { ResultValidatorService } from '../../../services/result-validator.service';
@Component({
    selector: 'app-nhacungcap-add',
    templateUrl: './nhacungcap-add.component.html',
    styleUrls: ['./nhacungcap-add.component.css']
})
export class NhacungcapAddComponent implements OnInit, OnDestroy {
    subcriptions: Subscription[] = [];
    frmAdd: FormGroup;
    error: boolean = null;
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
        this.frmAdd = this._formBuilder.group({
            Ten: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ]
        });
    }
    onSubmitForm() {
        this.nhaCungCapService.createNew(this.frmAdd.value);
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
