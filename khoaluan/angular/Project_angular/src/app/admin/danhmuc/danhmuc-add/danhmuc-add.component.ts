import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DanhMuc } from '../../../models/danhmuc';
import { DanhmucService } from '../../../services/danhmuc.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from '../../../services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DanhmucListComponent } from '../danhmuc-list/danhmuc-list.component';

@Component({
    selector: 'app-danhmuc-add',
    templateUrl: './danhmuc-add.component.html',
    styleUrls: ['./danhmuc-add.component.css']
})
export class DanhmucAddComponent implements OnInit, OnDestroy {
    is_loading = false;
    public subscriptions: Subscription[] = [];
    public danhmucs: DanhMuc[] = [];
    public frmAdd: FormGroup;
    constructor(
        private danhmucService: DanhmucService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<DanhmucListComponent>
    ) {}
    ngOnInit() {
        this.createForm();
        this.subscriptions.push(
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                },
                () => {}
            )
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

                ]
            ],
            idParent: ['', []],
            Hinh: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),

                ]
            ]
        });
    }
    onSubmitForm() {
        this.danhmucService.createNew(this.frmAdd.value);
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
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
}
