import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Quyen } from '../../../models/quyen';
import { Subscription } from 'rxjs';
import { QuyenService } from '../../../services/quyen.service';
import { ThongbaoService } from 'src/app/services/thongbao.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { QuyenCreateComponent } from '../quyen-create/quyen-create.component';
import { QuyenEditComponent } from '../quyen-edit/quyen-edit.component';

@Component({
    selector: 'app-quyen-list',
    templateUrl: './quyen-list.component.html',
    styleUrls: ['./quyen-list.component.css']
})
export class QuyenListComponent implements OnInit, OnDestroy {
    title = 'QUYỀN';
    expand = false;
    columnsToDisplay = this.expand
        ? ['id', 'ten', 'created_at', 'updated_at', 'action']
        : ['id', 'ten', 'action'];
    quyens: Quyen[] = [];
    subscriptions: Subscription[] = [];
    dataSource;
    isLoading = false;
    constructor(
        private quyenService: QuyenService,
        private thongbaoService: ThongbaoService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
    ) {}
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    ngOnInit() {
        this.quyenService.getAll();
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.quyenService.itemsObs.subscribe(
                data => {
                    this.quyens = data;
                    this.dataSource = new MatTableDataSource<Quyen>(
                        this.quyens
                    );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                () => {}
            )
        );
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
    onDelete(quyen: Quyen) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.quyenService.delete(quyen);
            }
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.columnsToDisplay = this.expand
            ? ['id', 'ten', 'created_at', 'updated_at', 'action']
            : ['id', 'ten', 'action'];
    }
    onAdd() {
        this.dialog.open(QuyenCreateComponent, {
            width: '400px'
        });
    }
    onEdit(item) {
        this.dialog.open(QuyenEditComponent, {
            width: '400px',
            data: item
        });
    }
    trackByFn(index, item) {
        return index;
    }
}
