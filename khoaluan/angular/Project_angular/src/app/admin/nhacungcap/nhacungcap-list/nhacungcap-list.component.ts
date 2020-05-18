import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NhaCungCap } from '../../../models/nhacungcap';
import { NhaCungCapService } from 'src/app/services/nhacungcap.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NhacungcapAddComponent } from '../../../admin/nhacungcap/nhacungcap-add/nhacungcap-add.component';
import { NhacungcapEditComponent } from '../../../admin/nhacungcap/nhacungcap-edit/nhacungcap-edit.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
    selector: 'app-nhacungcap-list',
    templateUrl: './nhacungcap-list.component.html',
    styleUrls: ['./nhacungcap-list.component.css']
})
export class NhacungcapListComponent implements OnInit, OnDestroy {
    expand = false;
    columnsToDisplay = [];
    items: NhaCungCap[] = [];
    subscriptions: Subscription[] = [];
    dataSource = new MatTableDataSource<NhaCungCap>();
    isLoading = false;
    constructor(
        private nhacungcapService: NhaCungCapService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
    ) {}
    loadDislayColumn() {
        this.columnsToDisplay = this.expand
            ? ['id', 'Ten', 'created_at', 'updated_at', 'action']
            : ['id', 'Ten', 'action'];
    }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    ngOnInit() {
        this.nhacungcapService.getAll();
        this.loadData();
    }
    loadData() {
        this.isLoading = true;
        this.loadDislayColumn();
        this.subscriptions.push(
            this.nhacungcapService.itemsObs.subscribe(
                data => {
                    this.items = data;
                    this.dataSource.data = this.items;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                },
                () => {}
            )
        );
    }
    onAdd() {
        this.dialog.open(NhacungcapAddComponent, {
            width: '400px'
        });
    }
    onDelete(item: NhaCungCap) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.nhacungcapService.delete(item);
            }
        });
    }
    onUpdate(item) {
        this.dialog.open(NhacungcapEditComponent, {
            width: '400px',
            data: item
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand;
        this.loadDislayColumn();
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(subscription =>
                subscription.unsubscribe()
            );
        }
    }
    trackByFn(index, item) {
        return index;
    }
}
