import { Component, OnInit, Input } from '@angular/core';
import { HoadonxuatService } from '../../../services/hoadonxuat.service';
import { BaocaoService } from 'src/app/services/baocao.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HoaDonXuat } from '../../../models/hoadonxuat';
import { HoaDonNhap } from '../../../models/hoadonnhap';

@Component({
    selector: 'app-doanhthu',
    templateUrl: './doanhthu.component.html',
    styleUrls: ['./doanhthu.component.css']
})
export class DoanhthuComponent implements OnInit {
    @Input() thugon: boolean;
    private frmBaoCao1: FormGroup;
    private isLoading: boolean = false;
    private subscriptions: Subscription[] = [];
    private hoadonxuats: HoaDonXuat[] = [];
    private hoadonnhaps: HoaDonNhap[] = [];
    constructor(
        private hoadonxuatService: HoadonxuatService,
        private baocaoService: BaocaoService,
        private datePipe: DatePipe,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.createForm();
    }
    getDoanhThu() {
        // let tongtien: number = 0
        // this.hoadonxuats.forEach(e => {
        //     tongtien += (this.hoadonxuatService.getTongTien(e.id) - this.hoadonxuatService.get_chiphi(e.id))
        // })
        // return tongtien
        return 0;
    }
    createForm() {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.frmBaoCao1 = this._formBuilder.group({
            NgayBD: [firstDay, [Validators.required]],
            NgayKT: [lastDay, [Validators.required]]
        });
        this.onBaoCao();
    }
    onBaoCao() {
        const formData = new FormData();
        formData.append(
            'NgayBD',
            this.datePipe.transform(
                this.frmBaoCao1.value['NgayBD'],
                'dd-MM-yyyy'
            )
        );
        formData.append(
            'NgayKT',
            this.datePipe.transform(
                this.frmBaoCao1.value['NgayKT'],
                'dd-MM-yyyy'
            )
        );
        this.isLoading = true;
        this.subscriptions.push(
            this.baocaoService
                .getbaocao_donhang(formData)
                .subscribe(
                    data => {
                        if (data) {
                            this.hoadonxuats = data.slice();
                        }
                    },
                    () => {}
                )
                .add(() => (this.isLoading = false))
        );
    }
}
