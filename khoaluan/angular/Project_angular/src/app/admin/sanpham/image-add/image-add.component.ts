import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { Sanpham } from '../../../models/sanpham';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SanphamListComponent } from '../sanpham-list/sanpham-list.component';
import { DanhmucService } from '../../../services/danhmuc.service';
import { DanhmuchinhService } from '../../../services/danhmuchinh.service';
import { DanhMucHinh } from '../../../models/danhmuchinh';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-image-add',
    templateUrl: './image-add.component.html',
    styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit, OnDestroy {
    api_url = environment.api_storage;
    sanpham: Sanpham;
    danhmuchinhs: DanhMucHinh[] = [];
    subcriptions: Subscription[] = [];
    is_loading = false;
    constructor(
        private dialogRef: MatDialogRef<SanphamListComponent>,
        private danhmuchinhService: DanhmuchinhService,
        @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {}
    ngOnInit() {
        this.sanpham = this.dataDialog.sanpham;
        this.loadData();
    }
    loadData() {
        this.subcriptions.push(
            this.danhmuchinhService.itemsObs.subscribe(
                data => {
                    this.danhmuchinhs = data;
                },
                () => {}
            )
        );
    }
    onAddImage(e) {
        this.is_loading = true;
        const formData = new FormData();
        formData.append('idSanPham', this.sanpham.id.toString());
        formData.append('Hinh', e.target.files[0]);
        this.danhmuchinhService.createNew(formData);
    }
    onDelele_hinh(item) {
        this.is_loading = true;
        this.danhmuchinhService.delete(item);
    }
    onFileChange(e) {
        if (e.target.value.length > 0) {
            this.is_loading = true;
            let file: File;
            if (e.target.files.length > 0) {
                file = e.target.files[0];
            }
            const formData = new FormData();
            formData.append('idSanPham', this.sanpham.id.toString());
            formData.append('Hinh', file);
            this.danhmuchinhService.createNew(formData);
        }
    }
    ngOnDestroy(): void {
        this.subcriptions.forEach(e => {
            e.unsubscribe();
        });
    }
}
