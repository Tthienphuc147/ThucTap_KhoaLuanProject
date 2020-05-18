import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiadiemService } from 'src/app/services/diadiem.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiadiemListComponent } from '../diadiem-list/diadiem-list.component';
import { DiaDiem } from 'src/app/models/diadiem';

@Component({
    selector: 'app-diadiem-create',
    templateUrl: './diadiem-create.component.html',
    styleUrls: ['./diadiem-create.component.css']
})
export class DiadiemCreateComponent implements OnInit, OnDestroy {

    subcriptions: Subscription[] = [];
    diadiems: DiaDiem[] = []
    frm: FormGroup;
    is_loading = false
    constructor (
        private diadiemService: DiadiemService,
        private resultValidatorService: ResultValidatorService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DiadiemListComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: DiaDiem
    ) { }
    ngOnInit() {
        this.createForm();
        this.loadData()
    }
    createForm() {
        this.frm = this._formBuilder.group({
            Ten: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern("[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*")
            ]],
            idParent: []
        })
    }
    loadData() {
        this.subcriptions.push(
            this.diadiemService.currentDiaDiem.subscribe(data => {
                this.diadiems = data
            })
        )
    }
    onSubmitForm() {
        this.is_loading = true
        this.subcriptions.push(this.diadiemService.createNew(this.frm.value).subscribe(data => {
            this.is_loading = false
            this.dialogRef.close()
        }, err => { console.log(err) }))
    }
    onValidator(controlName: string, status?: boolean) {
        return this.resultValidatorService.getResult(controlName, this.frm, status)
    }
    onValidatorBorderColor(controlName: string) {
        return this.resultValidatorService.getBorderColor(controlName, this.frm)
    }
    onValidatorTextColor(controlName: string) {
        return this.resultValidatorService.getTextColor(controlName, this.frm)
    }
    ngOnDestroy() {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => {
                e.unsubscribe()
            })
        }
    }

}
