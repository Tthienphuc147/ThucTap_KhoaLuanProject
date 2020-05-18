import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { MobileService } from 'src/app/services/mobile.service';
import { environment } from '../../../../environments/environment';
import { Sanpham } from '../../../models/sanpham';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { DanhmucService } from '../../../services/danhmuc.service';
import { NhasanxuatService } from '../../../services/nhasanxuat.service';
import { SanphamService } from '../../../services/sanpham.service';
import { DanhmucAddComponent } from '../../danhmuc/danhmuc-add/danhmuc-add.component';
import { ImageAddComponent } from '../image-add/image-add.component';
import { SanphamCreateComponent } from '../sanpham-create/sanpham-create.component';
import { SanphamEditComponent } from '../sanpham-edit/sanpham-edit.component';

class FoodNode {
    name: string;
    id: number;
    children?: FoodNode[];
    constructor(name: string, id: number, children?: FoodNode[]) {
        this.name = name;
        this.id = id;
        this.children = children;
    }
}
@Component({
    selector: 'app-sanpham-list',
    templateUrl: './sanpham-list.component.html',
    styleUrls: ['./sanpham-list.component.css']
})
export class SanphamListComponent implements OnInit, OnDestroy {
    matches = true;
    api_url = environment.api_storage;
    treeControl = new NestedTreeControl<FoodNode>(node => node.children);
    dataSourceDanhMuc = new MatTreeNestedDataSource<FoodNode>();
    expand = false;
    expandDanhMuc = true;
    isLoading = false;
    columnsToDisplay = this.expand
        ? [
              'id',
              'TenSanPham',
              'Hinh',
              'MoTa',
              'ThongTin',
              'idNSX',
              'idDanhMuc',
              'SoLuong',
              'created_at',
              'updated_at',
              'action'
          ]
        : [
              'id',
              'TenSanPham',
              'Hinh',
              'idNSX',
              'idDanhMuc',
              'SoLuong',
              'action'
          ];
    sanphams: any[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    danhmucs;
    nhasanxuats;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    hasChild = (_: number, node: FoodNode) => {
        return !!node.children && node.children.length > 0;
    };

    constructor(
        private sanphamService: SanphamService,
        private confirmDialogService: ConfirmDialogService,
        private nhasanxuatService: NhasanxuatService,
        private danhmucService: DanhmucService,
        public dialog: MatDialog,
        private mobileService: MobileService
    ) {}

    ngOnInit() {
        this.danhmucService.getAll();
        this.sanphamService.getAll();
        this.loadData();
    }
    loadData() {
        this.isLoading = true;
        this.subscriptions.push(
            this.mobileService.mobileObs.subscribe(data => {
                this.matches = data;
            }),
            this.nhasanxuatService.itemObs.subscribe(
                data => {
                    this.nhasanxuats = data;
                },
                err => {}
            ),
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;
                    this.transferTree();
                },
                err => {}
            ),
            this.sanphamService.itemsObs.subscribe(
                data => {
                    this.sanphams = data;
                    this.dataSource = new MatTableDataSource<any>(
                        this.sanphams
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                err => {}
            )
        );
    }
    dequy(idparent) {
        const children: FoodNode[] = [];
        this.danhmucs.forEach(element => {
            if (Number.parseInt(element.idParent) === idparent) {
                const newnode: FoodNode = new FoodNode(
                    element.Ten,
                    element.id,
                    this.dequy(element.id)
                );
                children.push(newnode);
            }
        });
        return children;
    }
    transferTree() {
        const TREE_DATA: FoodNode[] = [];
        this.danhmucs.forEach(element => {
            if (element.idParent == null) {
                const newnode: FoodNode = new FoodNode(
                    element.Ten,
                    element.id,
                    this.dequy(element.id)
                );
                TREE_DATA.push(newnode);
            }
        });
        this.dataSourceDanhMuc.data = TREE_DATA;
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(element => element.unsubscribe());
        }
    }
    onDelete(sanpham) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.sanphamService.delete(sanpham);
            }
        });
    }
    findChildDeQuy(id: number, array: number[]) {
        array.push(id);
        this.danhmucs.forEach(element => {
            if (element.idParent === id) {
                array.push(element.id);
                this.findChildDeQuy(element.id, array);
            }
        });
    }
    danhMucFilter(node: FoodNode) {
        const array = [];
        this.findChildDeQuy(node.id, array);
        this.dataSource.filterPredicate = (data: Sanpham, filter: number[]) => {
            return filter.indexOf(data.idDanhMuc) !== -1;
        };
        this.dataSource.filter = array;
    }
    applyFilter(filterValue: string) {
        this.dataSource.filterPredicate = (data: Sanpham, filter: string) =>
            data.TenSanPham.trim()
                .toLowerCase()
                .indexOf(filter) !== -1;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'TenSanPham',
                  'Hinh',
                  'MoTa',
                  'ThongTin',
                  'idNSX',
                  'idDanhMuc',
                  'SoLuong',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : [
                  'id',
                  'TenSanPham',
                  'Hinh',
                  'idNSX',
                  'idDanhMuc',
                  'SoLuong',
                  'action'
              ];
    }
    onExpandDanhMuc() {
        this.expandDanhMuc = !this.expandDanhMuc;
    }
    onAdd() {
        const dialogRef = this.dialog.open(SanphamCreateComponent, {
            maxWidth: this.matches ? '100vw' : '70vw',
            width: '100vw',
            maxHeight: this.matches ? '95%' : '90%',
            height: '300vw',
            panelClass: 'panel-sp',
            disableClose: true,
            hasBackdrop: true,
            data: {
                nhasanxuats: this.nhasanxuats,
                danhmucs: this.danhmucs
            }
        });
    }
    onAddImage(e) {
        const dialogRef = this.dialog.open(ImageAddComponent, {
            maxWidth: this.matches ? '100vw' : '50%',
            width: '100vw',

            panelClass: 'panel-sp',
            data: {
                sanpham: e
            }
        });
    }
    onEdit(data) {
        const dialogRef = this.dialog.open(SanphamEditComponent, {
            maxWidth: this.matches ? '100vw' : '70vw',
            width: '100vw',
            maxHeight: this.matches ? '95%' : '90%',
            height: '300vw',
            panelClass: 'panel-sp',
            hasBackdrop: true,
            disableClose: true,
            data: {
                sanpham: data,
                danhmucs: this.danhmucs,
                nhasanxuats: this.nhasanxuats
            }
        });
    }
    onOpenThemDanhMuc() {
        const dialogRef = this.dialog.open(DanhmucAddComponent, {
            width: '600px'
        });
    }
    trackByFn(index, item) {
        return index;
    }
}
