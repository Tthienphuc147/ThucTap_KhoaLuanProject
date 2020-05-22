import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiadiemService } from 'src/app/services/diadiem.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiadiemListComponent } from '../diadiem-list/diadiem-list.component';
import { DiaDiem } from '../../../models/diadiem';

@Component({
    selector: 'app-diadiem-edit',
    templateUrl: './diadiem-edit.component.html',
    styleUrls: ['./diadiem-edit.component.css']
})
export class DiadiemEditComponent implements OnInit, OnDestroy {

    subcriptions: Subscription[] = [];
    diadiem: DiaDiem = null;
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
        this.diadiem = this.dataDialog
        this.loadData()
        this.createForm();

    }
    loadData() {
        this.subcriptions.push(
            this.diadiemService.currentDiaDiem.subscribe(data => {
                this.diadiems = data
            })
        )
    }
    createForm() {
        console.log(this.diadiem)
        this.frm = this._formBuilder.group({
            id: [this.diadiem.id],
            Ten: [this.diadiem.Ten, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern("[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*")
            ]],
            idParent: [this.diadiem.idParent]
        })
    }
    onSubmitForm() {
        this.is_loading = true
        var formData = new FormData();
        formData.append('_method', 'put');
        for (var key in this.frm.value) {
            formData.append(key, this.frm.value[key])
        }
        this.subcriptions.push(this.diadiemService.update(formData).subscribe(data => {
            this.is_loading = false
            this.dialogRef.close()
        }, err => {
            console.log(err)
        }))
    }
    onReset() {
        this.frm.controls['Ten'].setValue(this.diadiem.Ten);
        this.frm.controls['idParent'].setValue(this.diadiem.idParent);
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
