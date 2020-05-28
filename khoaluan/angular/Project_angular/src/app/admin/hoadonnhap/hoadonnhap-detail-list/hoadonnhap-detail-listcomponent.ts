import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ChiTietHoaDonNhap } from '../../../models/chitiethoadonnhap';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'src/app/services/sanpham.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

import { HoadonnhapService } from '../../../services/hoadonnhap.service';
import { Sanpham } from '../../../models/sanpham';
import { ChitietHoaDonNhapService } from '../../../services/chitiethoadonnhap.service';
import { HoaDonNhap } from '../../../models/hoadonnhap';
import { environment } from '../../../../environments/environment';
import pdfMake from 'pdfmake/build/pdfmake';
import { DatePipe } from '@angular/common';
import pdfFonts from '../../../../assets/js/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Arial: {
    normal: 'Arial-Regular.ttf',
    bold: 'Arial-Bold.ttf',
    italics: 'Arial-Italics.ttf',
    bolditalics: 'Arial-Bolditalics.ttf'
  },
  THSarabunNew: {
    normal: 'THSarabunNew.ttf'
  },
  code128: {
    normal: 'code128.ttf'
  },
  Fontello: {
    normal: 'fontello.ttf',
    bold: 'fontello.ttf',
    italics: 'fontello.ttf',
    bolditalics: 'fontello.ttf'
  }
};
@Component({
    selector: 'app-hoadonnhap-detail-list',
    templateUrl: './hoadonnhap-detail-list.component.html',
    styleUrls: ['./hoadonnhap-detail-list.component.css']
})
export class HoadonnhapDetailListComponent implements OnInit, OnDestroy {
    private api_url = environment.api_img;
    listShow = [];
    expand = false;
    columnsToDisplay = this.expand
        ? [
              'id',
              'idSanPham',
              'SoLuong',
              'GiaNhap',
              'GiaBan',
              'created_at',
              'updated_at',
          ]
        : ['id', 'idSanPham', 'SoLuong', 'GiaNhap', 'GiaBan'];
    displayedColumnsSanPham = ['TenSanPham'];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    sanphams: Sanpham[] = [];
    chitiethoadonnhaps: ChiTietHoaDonNhap[] = [];
    hoadonnhap: HoaDonNhap;
    madotnhap: string;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(
        private thongbaoService: ThongbaoService,
        private activateRouteService: ActivatedRoute,
        private sanphamService: SanphamService,
        private confirmDialogService: ConfirmDialogService,
        private chitiethoadonnhapService: ChitietHoaDonNhapService,
        private hoadonnhapService: HoadonnhapService
    ) {}

    ngOnInit() {
        this.chitiethoadonnhapService.referById(
            this.activateRouteService.params['_value'].id
        ).subscribe(res => {
            this.dataSource = res.data;
            this.madotnhap = `MDN-000-000-000-${this.dataSource[0].idHDN}`
        });
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'idSanPham',
                  'SoLuong',
                  'GiaNhap',
                  'GiaBan',
                  'created_at',
                  'updated_at',
              ]
            : ['id', 'idSanPham', 'SoLuong', 'GiaNhap', 'GiaBan'];
    }

    trackByFn(index, item) {
        console.log(item);

        return index;
    }
    getDocument(){
        return {
            content: [
            {text: 'Tables', style: 'header'},
            'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
            {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
            'The following table has nothing more than a body array',
            {
                style: 'tableExample',
                table: {
                    body: [
                        ['Column 1', 'Column 2', 'Column 3'],
                        ['One value goes here', 'Another one here', 'OK?']
                    ]
                }
            }
        ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                // alignment: 'justify'
                font: 'Arial',
                fontSize: 10
            }
        }
    }
    generatePdf() {
        const documentDefinition = this.getDocument();
        pdfMake.createPdf(documentDefinition).open();
      }
}
