import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmPassword } from 'src/app/myvalidator/confirm-password.validator';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { ResultValidatorService } from '../../../services/result-validator.service';
import { ProfileComponent } from '../profile.component';

@Component({
    selector: 'app-doimatkhau-profile',
    templateUrl: './doimatkhau.component.html',
    styleUrls: ['./doimatkhau.component.css']
})
export class DoimatkhauProfileComponent implements OnInit {
    isshow = false;
    subscriptions: Subscription[] = [];
    frm: FormGroup;
    mess: string;
    currentUser: User;
    constructor(
        private loginService: LoginService,

        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ProfileComponent>,
        private resultValidatorService: ResultValidatorService
    ) {}

    ngOnInit() {
        this.loaddata();
        this.createForm();
    }
    async loaddata() {
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
            })
        );
    }
    createForm() {
        this.frm = this._formBuilder.group({
            old_password: ['', [Validators.required]],
            password: ['', [Validators.required]],
            re_password: [
                '',
                [Validators.required, ConfirmPassword.confirmPassword()]
            ]
        });
    }
    onSubmitForm() {
        const formdata = new FormData();
        formdata.append('id', this.currentUser.id + '');
        formdata.append(
            'old_password',
            this.frm.controls['old_password'].value
        );
        formdata.append('password', this.frm.controls['password'].value);
        this.loginService.doimatkhau(formdata).subscribe(data => {
            if (data['error'] === true) {
                this.isshow = true;
                this.mess = ' Mật khẩu cũ không đúng !';
            } else {
                this.dialogRef.close();
            }
        });
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
