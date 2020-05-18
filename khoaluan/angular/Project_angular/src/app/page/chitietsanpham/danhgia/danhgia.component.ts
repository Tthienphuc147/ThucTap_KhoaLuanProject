import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DanhgiaService } from 'src/app/services/danhgia.service';
import { environment } from '../../../../environments/environment';
import { ChiTietHoaDonXuat } from '../../../models/chitiethoadonxuat';
import { DanhGia } from '../../../models/danhgia';
import { User } from '../../../models/user';
import { ChitiethoadonxuatService } from '../../../services/chitiethoadonxuat.service';
import { HoadonxuatService } from '../../../services/hoadonxuat.service';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { HoaDonXuat } from './../../../models/hoadonxuat';
import { ProductDetailService } from '../../../services/product-detail.service';
import { Rating } from '../../../models/rating';

@Component({
    selector: 'app-danhgia',
    templateUrl: './danhgia.component.html',
    styleUrls: ['./danhgia.component.css']
})
export class DanhgiaComponent implements OnInit, OnDestroy {
    @Input() currentName: string;
    api_url = environment.api_storage;
    canRate = false;
    currentRate = 0;
    textShow = false;
    currentHinh: string;
    danhgias: DanhGia[] = [];
    ratings: Rating[] = [];
    users: User[] = [];
    currentUser: User;
    subscriptions: Subscription[] = [];
    frm: FormGroup;
    chitietHDXs: ChiTietHoaDonXuat[] = [];
    hoadonxuats: HoaDonXuat[] = [];
    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private productdetailService: ProductDetailService
    ) {}

    ngOnInit() {
        this.loadData();
        this.createForm();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    createForm() {
        this.frm = this._formBuilder.group({
            NoiDung: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ],
            Diem: [this.currentRate, [Validators.required]],
            idSanPham: [this.activatedRoute.params['value'].id],
            idUser: [this.currentUser ? this.currentUser.id : '']
        });
    }
    onSubmitForm() {
        this.productdetailService.createRating(this.frm.value);
    }
    loadData() {
        this.subscriptions.push(
            this.productdetailService.RatingDetailObs.subscribe(data => {
                if (data) {
                    this.ratings = data;
                }
            }),
            this.activatedRoute.params.subscribe(data => {
                if (this.currentUser) {
                    this.createForm();
                    this.productdetailService.checkBill(
                        this.currentUser ? this.currentUser.id : '',
                        this.activatedRoute.params['value'].id
                    );
                } else {
                    this.productdetailService.CanRateDetailSub.next(false);
                }
            }),
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
                if (this.currentUser) {
                    this.createForm();
                    this.productdetailService.checkBill(
                        this.currentUser.id,
                        this.activatedRoute.params['value'].id
                    );
                }
            }),
            this.productdetailService.CanRateDetailObs.subscribe(data => {
                this.canRate = data;
            }),
            this.userService.currentUser.subscribe(
                data => {
                    this.users = data;
                },
                err => {}
            )
        );
    }
    onDeleteDanhGia(e) {
        this.productdetailService.deleteRating(e);
    }
    duocxoa(item: DanhGia) {
        if (!this.currentUser) {
            return false;
        }
        return item.idUser === this.currentUser.id;
    }
    get_DiemTrungBinh(): number {
        if (this.ratings && this.ratings.length === 0) {
            return 0;
        }
        const w = this.ratings.reduce((tongdiem, item) => {
            return (tongdiem += item.Diem);
        }, 0);
        return w / this.ratings.length;
    }
    get_CountDanhGia() {
        return this.ratings.length;
    }
    get_TiLeDanhGia(number: number) {
        if (this.ratings.length === 0) {
            return 0;
        }
        const w = this.ratings.filter(e => {
            return e.Diem === number;
        }).length;
        return (w / this.ratings.length) * 100;
    }
}
