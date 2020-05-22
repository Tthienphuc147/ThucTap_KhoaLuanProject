import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { DangkyComponent } from '../page/dangky/dangky.component';
// import { DangnhapComponent } from '../page/dangnhap/dangnhap.component';
// import { DoimatkhauProfileComponent } from '../page/profile/doimatkhau/doimatkhau.component';
// import { ResetPasswordComponent } from '../page/reset-password/reset-password.component';
import { MobileService } from './mobile.service';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    matches = true;
    constructor(
        private dialog: MatDialog,
        private overlay: Overlay,
        private mobileService: MobileService
    ) {
        this.mobileService.mobileObs.subscribe(data => {
            this.matches = data;
        });
    }

    // showDangNhap() {
    //     const dialogDangNhap = this.dialog.open(DangnhapComponent, {
    //         maxWidth: this.matches ? '98vw' : '25vw',
    //         minWidth: '350px',
    //         width: '100vw',

    //         scrollStrategy: this.overlay.scrollStrategies.noop(),
    //         hasBackdrop: true,
    //         panelClass: 'myapp-no-padding-dialog'
    //     });
    //     dialogDangNhap.afterClosed().subscribe(result => {
    //         if (result === 'dangky') {
    //             this.showDangKy();
    //         }
    //         if (result === 'khoiphuc') {
    //             this.showKhoiPhuc();
    //         }
    //     });
    // }
    // showDangKy() {
    //     const dialogDangKy = this.dialog.open(DangkyComponent, {
    //         maxWidth: this.matches ? '98vw' : '25vw',
    //         minWidth: '350px',
    //         width: '100vw',
    //         scrollStrategy: this.overlay.scrollStrategies.noop(),
    //         hasBackdrop: true,
    //         panelClass: 'myapp-no-padding-dialog'
    //     });
    //     dialogDangKy.afterClosed().subscribe(result => {
    //         if (result === 'dangnhap') {
    //             this.showDangNhap();
    //         }
    //         if (result === 'khoiphuc') {
    //             this.showKhoiPhuc();
    //         }
    //     });
    // }
    // showKhoiPhuc() {
    //     const dialogKhoiPhuc = this.dialog.open(ResetPasswordComponent, {
    //         maxWidth: this.matches ? '98vw' : '25vw',
    //         minWidth: '350px',
    //         width: '100vw',
    //         scrollStrategy: this.overlay.scrollStrategies.noop(),
    //         hasBackdrop: false,
    //         panelClass: 'myapp-no-padding-dialog'
    //     });
    //     dialogKhoiPhuc.afterClosed().subscribe(result => {
    //         if (result === 'dangnhap') {
    //             this.showDangNhap();
    //         }
    //         if (result === 'dangky') {
    //             this.showDangKy();
    //         }
    //     });
    // }
    // showDoiMatKhau() {
    //     const dialogDoiMK = this.dialog.open(DoimatkhauProfileComponent, {
    //         maxWidth: this.matches ? '98vw' : '25vw',
    //         minWidth: '350px',
    //         width: '100vw',
    //         scrollStrategy: this.overlay.scrollStrategies.noop(),
    //         panelClass: 'myapp-no-padding-dialog'
    //     });
    //     dialogDoiMK.afterClosed().subscribe(result => {});
    // }
}
