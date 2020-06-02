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
import { DatePipe, CurrencyPipe } from '@angular/common';

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
        private hoadonnhapService: HoadonnhapService,
        private datePipe: DatePipe,
        private currencyPipe: CurrencyPipe
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
        // tslint:disable-next-line: max-line-length
       const base64Image1 = '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';

       const maHoaDon = this.madotnhap;
        let key= 0;

       return {
            background: [
                {
                  image: `data:image/jpeg;base64,${base64Image1}`,
                  width: 400,
                  style: 'watermark'
                }
              ],
            content: [

                {text: 'PHIẾU NHẬP KHO', style: 'header',alignment: 'center'},
                {
                      columns: [
                        {
                          style: 'text',
                          width: '70%',
                          // tslint:disable-next-line: max-line-length
                          text: `Ngày ${this.dataSource && this.datePipe.transform(this.dataSource[0].created_at, 'dd')} tháng ${this.dataSource && this.datePipe.transform(this.dataSource[0].created_at, 'MM')} năm ${this.dataSource && this.datePipe.transform(this.dataSource[0].created_at, 'y')}`,
                        },
                        {
                          style: 'text',
                          width: '30%',
                          // tslint:disable-next-line: max-line-length
                          text: `SỐ: ${maHoaDon}`
                        },
                      ],
                },
                {
                      columns: [
                        [
                          {style: 'text',text: `Nhà cung cấp: Thế giới di động`},
                        ],
                      ],
                },
                {
                      columns: [
                        [
                          {style: 'text',text: `Người nhập hàng: Nguyễn Hoàng Lâm`},
                        ],
                      ],
                },

                {
                      columns: [
                        [
                          {style: 'text',text: `Bản chi tiết hóa đơn nhập`},
                        ],
                      ],
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: [ '*', '*', '*', '*', '*', '*' ],
                        body: [
                            ['STT','Tên hàng hóa', 'Đ/v tính','Số lượng', 'Đơn giá', 'Thành tiền']
                            ,...(this.dataSource || []).map((ed, index) => {
                                return [index+1,ed.TenSanPham,'VNĐ',ed.SoLuong,`${this.currencyPipe.transform(ed.GiaNhap,'VND','symbol')}`,`${this.currencyPipe.transform(ed.GiaNhap*ed.SoLuong,'VND','symbol')}`];
                              })
                        ],

                    }
                },
                {
                      columns: [
                        [
                          {style: 'text',text: `Tổng số tiền: ${this.currencyPipe.transform(this.getTotalAmount(this.dataSource),'VND','symbol')}`},
                        ],
                      ],
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
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
                },
                text: {
                    fontSize: 13,
                       margin: [0, 0, 0, 5],
                },
                 watermark: {
                  alignment: 'center',
                  margin: [0, 150, 0, 0]
                },
            },
            defaultStyle: {
                // alignment: 'justify'
                font: 'Arial'
            }
        };
    }
    generatePdf() {
        const documentDefinition = this.getDocument();
        pdfMake.createPdf(documentDefinition).open();
      }
    getTotalAmount(data: []){
        let total =0;
        (data || []).forEach(item=>total+=(item['GiaNhap']*item['SoLuong']));
        return total;

    }
}