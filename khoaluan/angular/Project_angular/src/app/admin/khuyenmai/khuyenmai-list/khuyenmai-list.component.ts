import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { KhuyenMai } from 'src/app/models/khuyenmai';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { KhuyenmaiService } from 'src/app/services/khuyenmai.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { KhuyenmaiCreateComponent } from '../khuyenmai-create/khuyenmai-create.component';

class MyNode {
    obj: KhuyenMai;
    isShow: boolean;
    constructor(obj: KhuyenMai, isshow: boolean) {
        this.obj = obj;
        this.isShow = isshow;
    }
}
@Component({
    selector: 'app-khuyenmai-list',
    templateUrl: './khuyenmai-list.component.html',
    styleUrls: ['./khuyenmai-list.component.css']
})
export class KhuyenmaiListComponent implements OnInit, OnDestroy {
    myNodes: MyNode[] = [];
    expand = false;
    columnsToDisplay;
    khuyenmais: KhuyenMai[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    datePipe = new DatePipe('en');

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    constructor(
        private khuyenmaiService: KhuyenmaiService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
    ) {}

    ngOnInit() {
        this.khuyenmaiService.getAll();
        this.loadDislayColumn();
        this.loadData();
    }
    loadDislayColumn() {
        this.columnsToDisplay = this.expand
            ? [
                  'id',
                  'ten',
                  'mota',
                  'ngaybd',
                  'ngaykt',
                  'created_at',
                  'updated_at',
                  'action'
              ]
            : ['ten', 'ngaybd', 'ngaykt', 'action'];
    }
    loadData() {
        this.isLoading = true;
        this.subscriptions.push(
            this.khuyenmaiService.itemsObs.subscribe(
                data => {
                    this.khuyenmais = data;
                    this.myNodes = [];
                    this.khuyenmais.forEach(e => {
                        const newnode = new MyNode(e, true);
                        this.myNodes.push(newnode);
                    });
                    this.dataSource = new MatTableDataSource<MyNode>(
                        this.myNodes
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                () => {}
            ),
            this.khuyenmaiService.isLoadingObs.subscribe(data => {
                this.isLoading = data;
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
        }
    }
    trackByFn(index, item) {
        return index;
    }
    onDelete(khuyenmai: KhuyenMai) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.khuyenmaiService.delete(khuyenmai);
            }
        });
    }
    onSaveRow(item) {
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in item.obj) {
            if (key === 'NgayBD' || key === 'NgayKT') {
                formData.append(
                    key,
                    this.datePipe.transform(
                        item.obj[key] + '',
                        'dd-MM-yyyy h:mm a'
                    )
                );
            } else {
                formData.append(key, item.obj[key]);
            }
        }
        this.khuyenmaiService.update(formData);
    }
    onCancel(item) {
        item.isShow = !item.isShow;
        const index = this.khuyenmais.findIndex(e => e.id === item.obj.id);
        item.obj = this.khuyenmais[index];
    }
    updateTable(danhmuc) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return value.obj.id !== danhmuc.id;
        });
        this.table.renderRows();
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.loadDislayColumn();
    }
    onAdd() {
        const dialogRef = this.dialog.open(KhuyenmaiCreateComponent, {
            width: '400px',
            data: { khuyenmais: this.khuyenmais }
        });
    }
}
