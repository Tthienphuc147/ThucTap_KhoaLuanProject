import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DemoMaterialModule } from '../admin/masterial-module';
import { NoSanitizePipe } from '../pipe/no-sanitize.pipe';
import { TextTruncatePipe } from '../pipe/text-truncate.pipe';
import { NgxImageZoomModule } from 'ngx-image-zoom';
@NgModule({
    declarations: [TextTruncatePipe, TimeAgoPipe, NoSanitizePipe],
    imports: [
        CommonModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        RouterModule,
        NgxImageZoomModule
    ],
    exports: [
        DemoMaterialModule,
        ReactiveFormsModule,
        TextTruncatePipe,
        FormsModule,
        TimeAgoPipe,
        NgbModule,
        NoSanitizePipe,
        RouterModule,
        CommonModule,
        NgxImageZoomModule
    ]
})
export class ShareModule {}
