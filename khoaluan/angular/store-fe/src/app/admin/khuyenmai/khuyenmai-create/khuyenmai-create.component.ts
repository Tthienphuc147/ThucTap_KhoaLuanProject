import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { KhuyenMai } from 'src/app/models/khuyenmai';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KhuyenmaiService } from '../../../services/khuyenmai.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KhuyenmaiComponent } from '../khuyenmai.component';
import { formatDate, DatePipe } from '@angular/common';

@Component({
    selector: 'app-khuyenmai-create',
    templateUrl: './khuyenmai-create.component.html',
    styleUrls: ['./khuyenmai-create.component.css']
})
export class KhuyenmaiCreateComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    khuyenmais: KhuyenMai[] = [];
    frm: FormGroup;
    datePipe = new DatePipe('en');
    is_loading = false;
    constructor(
        private khuyenmaiService: KhuyenmaiService,
        private _formBuilder: FormBuilder,
        private thongBaoService: ThongbaoService,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<KhuyenmaiComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {}
    ngOnInit() {
        this.khuyenmais = this.dataDialog.khuyenmais;
        this.createForm();
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.khuyenmaiService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frm = this._formBuilder.group({
            Ten: ['', [Validators.required]],
            MoTa: ['', [Validators.required]],
            NgayBD: ['', [Validators.required]],
            NgayKT: ['', [Validators.required]]
        });
    }
    onSubmitForm() {
        const formData = new FormData();
        for (const key in this.frm.value) {
            if (key === 'NgayBD' || key === 'NgayKT') {
                this.frm.value[key] = this.datePipe.transform(
                    this.frm.controls[key].value,
                    'dd-MM-yyyy h:mm a'
                );
            }
            formData.append(key, this.frm.value[key]);
        }
        this.khuyenmaiService.createNew(formData);
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
        }
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
}
