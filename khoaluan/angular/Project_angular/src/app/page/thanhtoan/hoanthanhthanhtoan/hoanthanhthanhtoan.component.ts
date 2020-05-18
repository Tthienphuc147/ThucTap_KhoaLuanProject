import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Subscription } from 'rxjs';
import { Sanpham } from 'src/app/models/sanpham';
import { KhuyenMai } from 'src/app/models/khuyenmai';
import { ChiTietKhuyenMai } from 'src/app/models/chitietkhuyenmai';
import { NhaSanXuat } from 'src/app/models/nhasanxuat';
import { ChiTietHoaDonNhap } from 'src/app/models/chitiethoadonnhap';
import { ChiTietHoaDonXuat } from 'src/app/models/chitiethoadonxuat';
import { CartService } from 'src/app/services/cart.service';
import { SanphamService } from 'src/app/services/sanpham.service';
import { NhasanxuatService } from 'src/app/services/nhasanxuat.service';
import { DiadiemService } from 'src/app/services/diadiem.service';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { HoadonxuatService } from '../../../services/hoadonxuat.service';
import { environment } from '../../../../environments/environment';
import { HomePageService } from 'src/app/services/home-page.service';
import { Product } from '../../../models/Product';
import { ThanhtoanService } from '../../../services/thanhtoan.service';
import { ChitiethoadonxuatService } from 'src/app/services/chitiethoadonxuat.service';
@Component({
    selector: 'app-hoanthanhthanhtoan',
    templateUrl: './hoanthanhthanhtoan.component.html',
    styleUrls: ['./hoanthanhthanhtoan.component.css']
})
export class HoanthanhthanhtoanComponent implements OnInit, OnDestroy {
    private api_url = environment.api_storage;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    phuongthucs: string[] = ['COD', 'Ngân lượng', 'Visa'];
    @Input() frm1;
    @Input() frm2;
    @Output() myClick = new EventEmitter<boolean>();
    currentUser: User;
    carts: Cart[] = [];
    subscriptions: Subscription[] = [];
    sanphams: Product[] = [];
    khuyenmais: KhuyenMai[] = [];
    chitietkhuyenmais: ChiTietKhuyenMai[] = [];
    nhasanxuats: NhaSanXuat[] = [];
    chitietHDNs: ChiTietHoaDonNhap[] = [];
    chitietHDXs: ChiTietHoaDonXuat[] = [];
    private tongtien = 0;
    constructor(
        private cartService: CartService,
        private diadiemService: DiadiemService,
        private loginService: LoginService,
        private homePageService: HomePageService,
        private thanhtoanService: ThanhtoanService,
        private hoadonxuatService: HoadonxuatService,
        private chitietHDXService: ChitiethoadonxuatService
    ) {}

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.homePageService.ProductObs.subscribe(
                data => {
                    this.sanphams = data;
                },
                err => {}
            ),
            this.cartService.currentCart.subscribe(
                data => {
                    this.carts = data;
                },
                err => {}
            ),
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
            })
        );
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
    getDiaChi() {
        if (this.frm1.idDiaDiem) {
            return this.diadiemService.getDiaChi(this.frm1.idDiaDiem);
        }
        return null;
    }
    onSubmitThanhToan() {
        if (this.carts) {
            const formData = new FormData();
            formData.append('cart', JSON.stringify(this.carts));
            formData.append('NguoiNhan', this.frm1.NguoiNhan);
            formData.append('DiaChi', this.frm1.DiaChi);
            formData.append('DienThoai', this.frm1.DienThoai);
            formData.append(
                'idUser',
                this.currentUser ? this.currentUser.id + '' : ''
            );
            formData.append('idDiaDiem', this.frm1.idDiaDiem);
            formData.append('idTrangThai', '1');
            this.thanhtoanService
                .submitOrder(formData)
                .toPromise()
                .then(res => {
                    if (res) {
                        this.cartService.totalSub.next(res['total'][0]['sum']);
                        this.cartService.clearCart();
                        this.myClick.emit(res['order'].id);
                    }
                });
        }
    }
}
