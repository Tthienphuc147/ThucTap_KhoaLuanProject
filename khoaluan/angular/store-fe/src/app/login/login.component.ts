import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ResultValidatorService } from 'src/app/services/result-validator.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    currentUser: User;
    frm: FormGroup;
    subcription: Subscription;
    error = false;
    error_content = 'Tên đăng nhập hoặc mật khẩu không chính xác';
    constructor(
        private router: Router,
        private loginService: LoginService,
        private _formBuilder: FormBuilder,
        private thongBaoService: ThongbaoService,
        private resultValidatorService: ResultValidatorService
    ) {}

    ngOnInit() {
        this.subcription = this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
        });
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
                if (data) {
                    this.router.navigate(['/']);
                } else {
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
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
        if (this.subcription) {
            this.subcription.unsubscribe();
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
