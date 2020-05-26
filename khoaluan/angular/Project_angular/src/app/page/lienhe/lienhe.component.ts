import { ThongbaoService } from './../../services/thongbao.service';
import { LienHeService } from './../../services/lien-he.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TinTucService } from 'src/app/services/tin-tuc.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lienhe',
  templateUrl: './lienhe.component.html',
  styleUrls: ['./lienhe.component.css']
})
export class LienHeComponent implements OnInit {
    api_url = environment.api_storage;
    listTinTuc: any;
    param: string;
    page = 1;
    pageSize = 6;
    contactForm: FormGroup;
    submitted = false;
    constructor(private formBuilder: FormBuilder,
        private lienHeService: LienHeService,
        private thongbaoService: ThongbaoService,
        private router: Router,) {

    }
    ngOnInit(){
        this.createContactForm();
    }

    createContactForm(){
      this.contactForm = this.formBuilder.group({
        subject: ['', Validators.required],
        email: ['', Validators.required, , Validators.email],
        message: ['', Validators.required],
        name: ['', Validators.required],

      });
    }

    get f() { return this.contactForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.contactForm.invalid) {
            return;
        }
        const responeData = {
            ten_lien_he: this.contactForm.controls.name.value,
            mail_lien_he: this.contactForm.controls.email.value,
            lien_he: this.contactForm.controls.subject.value,
            loi_nhan: this.contactForm.controls.message.value
        };

       this.lienHeService.sendContact(responeData).subscribe(res => {
        this.thongbaoService.open('Gửi liên hệ thành công!', 'bg-success');
        this.router.navigate(['/']);
       })
    }

}
