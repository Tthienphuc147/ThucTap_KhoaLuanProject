import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { TimeAgoPipe } from 'time-ago-pipe';
import { DemoMaterialModule } from '../admin/masterial-module';
import { NoSanitizePipe } from '../pipe/no-sanitize.pipe';
import { TextTruncatePipe } from '../pipe/text-truncate.pipe';

@NgModule({
    declarations: [TextTruncatePipe,  NoSanitizePipe],
    imports: [
        CommonModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        RouterModule,
    ],
    exports: [
        DemoMaterialModule,
        ReactiveFormsModule,
        TextTruncatePipe,
        FormsModule,
        NgbModule,
        NoSanitizePipe,
        RouterModule,
        CommonModule,
    ]
})
export class ShareModule {}
