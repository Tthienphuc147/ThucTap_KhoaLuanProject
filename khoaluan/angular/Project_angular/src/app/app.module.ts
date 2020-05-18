import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ThongbaoComponent } from './components/thongbao/thongbao.component';
import { MyHelper } from './helper/MyHelper';
import { BaocaoService } from './services/baocao.service';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { ThongbaoService } from './services/thongbao.service';
import { ShareModule } from './share/share.module';
import { TokenInterceptor } from './auth/intercreptors/token.intercreptor';
import { ImagePopupComponent } from './components/image-popup/image-popup.component';
// import { RefreshTokenInterceptor } from './auth/intercreptors/refreshToken.intercreptor';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        ThongbaoComponent,
        ConfirmDialogComponent,
        ImagePopupComponent
    ],
    imports: [
        HttpClientModule,
        AppRoutingModule,
        ShareModule,
        BrowserAnimationsModule
    ],
    entryComponents: [ThongbaoComponent, ConfirmDialogComponent,ImagePopupComponent],

    providers: [
        ThongbaoService,
        MyHelper,
        ConfirmDialogService,
        BaocaoService,
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    exports: [ConfirmDialogComponent],

    bootstrap: [AppComponent]
})
export class AppModule {}
