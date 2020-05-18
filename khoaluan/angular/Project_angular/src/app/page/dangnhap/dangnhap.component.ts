import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { ResultValidatorService } from '../../services/result-validator.service';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
    selector: 'app-dangnhap',
    templateUrl: './dangnhap.component.html',
    styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit {
    reCatcha_status = false;
    LoginService;
    currentUser: User;
    frm: FormGroup;
    subcriptions: Subscription[] = [];
    error = false;
    error_content = 'Tên đăng nhập hoặc mật khẩu không chính xác';
    constructor(
        private router: Router,
        private loginService: LoginService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<HeaderComponent>
    ) {}

    ngOnInit() {
        this.subcriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
            })
        );
        if (this.currentUser) {
            this.router.navigate(['/']);
        }
        this.createForm();
    }
    createForm() {
        this.frm = this._formBuilder.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ],
            password: ['', [Validators.required]],
            remember: [false, []]
        });
    }
    onSubmitForm() {
        this.loginService.login(this.frm.value).subscribe(
            data => {
                if (data['error'] === true) {
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                } else {
                    if (data.idQuyen === 0) {
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/']);
                    }
                    this.onNoClick();
                }
            },
            err => {
                this.error = true;
                setTimeout(() => {
                    this.error = false;
                }, 3000);
            }
        );
    }
    OnDestroy() {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => e.unsubscribe());
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
    onNoClick(): void {
        this.dialogRef.close();
    }
    public resolved(captchaResponse: string) {
        this.reCatcha_status = false;
        if (captchaResponse) {
            this.reCatcha_status = true;
        }
    }
}
