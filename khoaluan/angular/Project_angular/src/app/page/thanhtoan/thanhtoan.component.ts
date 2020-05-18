import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { DiaDiem } from 'src/app/models/diadiem';
import { CartService } from 'src/app/services/cart.service';
import { DiadiemService } from 'src/app/services/diadiem.service';
import { HoadonxuatService } from 'src/app/services/hoadonxuat.service';
import { Cart } from '../../models/cart';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { ResultValidatorService } from '../../services/result-validator.service';
import { HoanthanhthanhtoanComponent } from './hoanthanhthanhtoan/hoanthanhthanhtoan.component';
import { HomePageService } from 'src/app/services/home-page.service';
import { Product } from '../../models/Product';

@Component({
    selector: 'app-thanhtoan',
    templateUrl: './thanhtoan.component.html',
    styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent implements OnInit, OnDestroy {
    @ViewChild('stepper', { static: true }) stepper: MatVerticalStepper;
    @ViewChild(HoanthanhthanhtoanComponent, null)
    childHTTT: HoanthanhthanhtoanComponent;
    subscriptions: Subscription[] = [];
    user: User;
    carts: Cart[] = [];
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    tongtien = 0;
    diadiems: DiaDiem[] = [];
    thanhphos: DiaDiem[] = [];
    quans: DiaDiem[] = [];
    phuongs: DiaDiem[] = [];
    thanhpho: DiaDiem;
    quan: DiaDiem;
    phuong: DiaDiem;
    phuongthucs: string[] = ['COD', 'Ngân lượng', 'Visa'];
    shownext = true;
    showback = true;
    showdathang = false;
    is_loading = false;
    sanphams: Product[] = [];
    constructor(
        private loginService: LoginService,
        private _formBuilder: FormBuilder,
        private diadiemService: DiadiemService,
        private resultValidatorService: ResultValidatorService,
        private cartService: CartService,
        private hoadonxuatService: HoadonxuatService,
        private homePageService: HomePageService
    ) {}
    ngOnInit() {
        this.loadData();
        this.creatForm();
    }
    creatForm() {
        this.firstFormGroup = this._formBuilder.group({
            NguoiNhan: [this.user ? this.user.Ten : '', [Validators.required]],
            DiaChi: [this.user ? this.user.DiaChi : '', [Validators.required]],
            DienThoai: [
                this.user ? Number.parseInt(this.user.DienThoai) : null,
                [Validators.required]
            ],
            idDiaDiem: [
                this.user ? Number.parseInt(this.user.idDiaDiem + '') : '',
                [Validators.required]
            ]
        });
        this.secondFormGroup = this._formBuilder.group({
            phuongthuctt: [0, Validators.required]
        });
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    loadData() {
        this.checkStep(this.stepper.selectedIndex);
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.user = data;
            }),
            this.diadiemService.currentDiaDiem.subscribe(data => {
                this.diadiems = data.slice();
                this.getPhuong();
                this.getQuan();
                this.getThanhPho();
                this.getThanhPhos();
            }),
            this.cartService.cartSubject.subscribe(data => {
                this.carts = data;
            }),
            this.cartService.totalObs.subscribe(data => {
                this.tongtien = data;
            }),
            this.stepper.selectionChange.subscribe(e => {
                this.checkStep(e.selectedIndex);
            }),
            this.homePageService.ProductObs.subscribe(
                data => {
                    this.sanphams = data;
                },
                err => {}
            )
        );
    }
    checkStep(e) {
        if (e === 0) {
            this.showback = false;
            this.showdathang = false;
            this.shownext = true;
        }
        if (e === 1) {
            this.showback = true;
            this.showdathang = false;
            this.shownext = true;
        }
        if (e === 2) {
            this.showback = true;
            this.showdathang = true;
            this.shownext = false;
        }
        if (e === 3) {
            this.showback = false;
            this.showdathang = false;
            this.shownext = false;
        }
    }
    getThanhPhos() {
        this.thanhphos = this.diadiems
            .filter(data => {
                return data.idParent == null;
            })
            .slice();
    }
    getThanhPho() {
        if (this.quan) {
            this.thanhpho = this.diadiems
                .filter(data => {
                    return data.id === this.quan.idParent;
                })
                .slice()[0];
            this.quans = this.diadiems.filter(data => {
                return data.idParent === this.quan.idParent;
            });
        }
    }
    getQuan() {
        if (this.phuong) {
            this.quan = this.diadiems
                .filter(data => {
                    return data.id === this.phuong.idParent;
                })
                .slice()[0];
            this.phuongs = this.diadiems
                .filter(data => {
                    return data.idParent === this.phuong.idParent;
                })
                .slice();
        }
    }
    findSanPham(idsanpham: number) {
        if (this.sanphams) {
            return this.sanphams.filter(e => {
                return e.id === idsanpham;
            })[0];
        }
    }
    loadthanhtien() {
        if (this.sanphams) {
            const sumTotal = this.carts.reduce((total, item) => {
                const obj = this.findSanPham(item.idSanPham);
                return obj
                    ? (total += obj.price * (1 - obj.rate) * item.SoLuong)
                    : 0;
            }, 0);
            return sumTotal;
        } else {
            return 0;
        }
    }
    onStepChange(e) {
        this.stepper.next();
        // tslint:disable-next-line:no-unused-expression
        this.stepper.disableRipple;
    }
    onChangeThanhPho(id: number) {
        this.quans = this.diadiems
            .filter(data => {
                return data.idParent === id;
            })
            .slice();
    }
    onChangeQuan(id: number) {
        this.phuongs = this.diadiems
            .filter(data => {
                return data.idParent === id;
            })
            .slice();
    }
    getPhuong() {
        if (this.user) {
            this.phuong = this.diadiems
                .filter(data => {
                    return data.id === this.user.idDiaDiem;
                })
                .slice()[0];
        }
    }
    onValidator(controlName: string, status?: boolean) {
        return this.resultValidatorService.getIcon(
            controlName,
            this.firstFormGroup,
            status
        );
    }
    onValidatorBorderColor(controlName: string) {
        return this.resultValidatorService.getBorderColor(
            controlName,
            this.firstFormGroup
        );
    }
    onValidatorTextColor(controlName: string) {
        return this.resultValidatorService.getTextColor(
            controlName,
            this.firstFormGroup
        );
    }
    onValidator2(controlName: string, status?: boolean) {
        return this.resultValidatorService.getIcon(
            controlName,
            this.secondFormGroup,
            status
        );
    }
    onValidatorBorderColor2(controlName: string) {
        return this.resultValidatorService.getBorderColor(
            controlName,
            this.secondFormGroup
        );
    }
    onValidatorTextColor2(controlName: string) {
        return this.resultValidatorService.getTextColor(
            controlName,
            this.secondFormGroup
        );
    }
    onPutChild() {
        this.is_loading = true;
        this.childHTTT.onSubmitThanhToan();
    }
    onBack() {
        this.stepper.previous();
    }
    onNext() {
        this.stepper.next();
    }
}
