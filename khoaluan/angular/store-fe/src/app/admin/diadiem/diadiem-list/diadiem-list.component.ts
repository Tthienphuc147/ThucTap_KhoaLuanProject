import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DiaDiem } from '../../../models/diadiem';
import { DiadiemService } from '../../../services/diadiem.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DiadiemCreateComponent } from '../diadiem-create/diadiem-create.component';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { DiadiemEditComponent } from '../diadiem-edit/diadiem-edit.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';

@Component({
    selector: 'app-diadiem-list',
    templateUrl: './diadiem-list.component.html',
    styleUrls: ['./diadiem-list.component.css']
})
export class DiadiemListComponent implements OnInit, OnDestroy {
    title = "ĐỊA ĐIỂM"
    expand = false;
    columnsToDisplay = []
    subscriptions: Subscription[] = [];
    dataSource
    isLoading = false
    diadiems: DiaDiem[] = []
    constructor (
        private diadiemService: DiadiemService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService

    ) { }
    loadDislayColumn() {
        this.columnsToDisplay = this.expand ? ['id', 'Ten', 'idParent', 'created_at', 'updated_at', 'action'] : ['id', 'Ten', 'idParent', 'action'];
    }
    loadDataTable() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.isLoading = true
        this.loadDislayColumn()
        this.subscriptions.push(this.diadiemService.currentDiaDiem.subscribe(data => {
            this.diadiems = data;
            this.dataSource = new MatTableDataSource<DiaDiem>(this.diadiems);
            this.loadDataTable()
            this.isLoading = false
        }, err => {
            console.log(err);

        }).add(() => {

        }))
    }
    getDiaDiem(id: number) {
        return this.diadiems.filter(data => {
            return data.id == id
        })[0]
    }
    onAdd() {
        this.dialog.open(DiadiemCreateComponent, {
            width: '400px',
        });
    }
    onDelete(item: DiaDiem) {
        this.confirmDialogService.openDialog().then(result => {
            if (result) {
                this.subscriptions.push(this.diadiemService.delete(item).subscribe(() => {
                }, err => {
                    console.log(err);
                }))
            }
        })

    }
    onEdit(data) {
        this.dialog.open(DiadiemEditComponent, {
            width: '400px',
            data: data
        });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    onExpand() {
        this.expand = !this.expand
        this.loadDislayColumn()
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
    }

}
