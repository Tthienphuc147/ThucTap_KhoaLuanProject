import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DanhMuc } from '../../../models/danhmuc';
import { Sanpham } from '../../../models/sanpham';
import { User } from '../../../models/user';
import { CartService } from '../../../services/cart.service';
import { DanhmucService } from '../../../services/danhmuc.service';
import { DataService } from '../../../services/data.service';
import { DialogService } from '../../../services/dialog.service';
import { LoginService } from '../../../services/login.service';
import { OtherService } from '../../../services/other.service';
import { SanphamService } from '../../../services/sanpham.service';
import { HomePageService } from '../../../services/home-page.service';
import { Product } from '../../../models/Product';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
    // api_url = environment.api_img;
    // ngOnDestroy(): void {
    //     if (this.subscriptions) {
    //         this.subscriptions.forEach(e => e.unsubscribe());
    //     }
    // }
    // //  keyword: string = this.activatedRoute.queryParams.source['value']['keyword']
    // input_tim: string;
    // opened: boolean;
    // dataSourceSanPham: Sanpham[] = [];
    // sanphams: Product[] = [];
    // isShow = false;
    // showmenu = true;
    // subscriptions: Subscription[] = [];
    // countCarts = 0;
    // danhmucs: DanhMuc[] = [];
    // isloaded = false;
    // currentUser: User;
    // constructor(
    //     private cartService: CartService,
    //     private dataService: DataService,
    //     private danhmucService: DanhmucService,
    //     private activatedRoute: ActivatedRoute,
    //     private loginService: LoginService,
    //     private homePageService: HomePageService,
    //     private dialogService: DialogService,
    //     private router: Router,
    //     private otherService: OtherService
    // ) {
    //     if (this.activatedRoute.snapshot.children[0].routeConfig.path === '') {
    //         this.showmenu = true;
    //     }
    // }

    // ngOnInit() {
    //     this.loadData();
    // }
    // onClickDanhMuc(e) {
    //     this.router.navigate(['/search'], { queryParams: { cat: e.id } });
    // }
    // loadData() {
    //     this.subscriptions.push(
    //         this.cartService.currentCount.subscribe(
    //             data => {
    //                 this.countCarts = data;
    //             },
    //             err => {}
    //         ),
    //         this.dataService.currentIsLoaded.subscribe(
    //             data => {
    //                 this.isloaded = data;
    //             },
    //             err => {}
    //         ),
    //         this.danhmucService.itemsObs.subscribe(
    //             data => {
    //                 this.danhmucs = data
    //                     .filter(e => {
    //                         return e.idParent == null;
    //                     })
    //                     .slice(0, 8);
    //             },
    //             err => {}
    //         ),
    //         this.dataService.getIsShow().subscribe(
    //             data => {
    //                 this.isShow = data;
    //             },
    //             err => {}
    //         ),
    //         this.loginService.currentUser.subscribe(
    //             data => {
    //                 this.currentUser = data;
    //             },
    //             err => {}
    //         ),
    //         this.homePageService.ProductObs.subscribe(data => {
    //             this.sanphams = data.slice();
    //             this.dataSourceSanPham = this.sanphams;
    //         }),
    //         this.activatedRoute.queryParamMap.subscribe(data => {
    //             this.input_tim = data['params']['keyword'];
    //         })
    //     );
    // }
    // applyFilterAdd(filterValue: string) {
    //     debounceTime(300);
    //     this.dataSourceSanPham = this.sanphams
    //         .filter(e => {
    //             return this.cleanAccents(
    //                 e.TenSanPham.trim()
    //                     .toLowerCase()
    //                     .replace(' ', '')
    //             ).includes(
    //                 this.cleanAccents(
    //                     filterValue
    //                         .trim()
    //                         .toLowerCase()
    //                         .replace(' ', '')
    //                 )
    //             );
    //         })
    //         .slice();
    // }
    // public cleanAccents(str: string) {
    //     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    //     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    //     str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    //     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    //     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    //     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    //     str = str.replace(/đ/g, 'd');
    //     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    //     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    //     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    //     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    //     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    //     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    //     str = str.replace(/Đ/g, 'D');
    //     str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    //     str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
    //     return str;
    // }
    // getsub_danhmuc(id: number, sl: number) {
    //     let dm;
    //     this.danhmucService.itemsObs.subscribe(data => {
    //         dm = data
    //             .filter(e => {
    //                 return e.idParent === id;
    //             })
    //             .slice(0, sl);
    //     });
    //     return dm;
    // }
    // onHoverDanhMuc() {}
    // onLogout() {
    //     this.loginService.logout();
    // }
    // onDangNhap() {
    //     this.dialogService.showDangNhap();
    // }
    // onDangKy() {
    //     this.dialogService.showDangKy();
    // }
    // onSearch() {
    //     const navigationExtras: NavigationExtras = {
    //         queryParams: { keyword: this.input_tim }
    //     };
    //     this.router.navigate(['search'], navigationExtras);
    // }
    // onShowMenu() {
    //     this.otherService.toggle_showmenu();
    // }
}
