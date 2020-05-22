import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from '../../../services/login.service';

class NodeUser {
    user: User;
    isShow: boolean;
    constructor (user: User, isshow: boolean) {
        this.user = user;
        this.isShow = isshow
    }
}
@Component({
    selector: 'app-phanquyen-tab',
    templateUrl: './phanquyen-tab.component.html',
    styleUrls: ['./phanquyen-tab.component.css']
})
export class PhanquyenTabComponent implements OnInit, OnDestroy {
    currentUser: User;
    @Input() idtab: number;
    users: User[] = [];
    subscriptions: Subscription[] = []
    nodeUsers: NodeUser[] = []
    columnsToDisplay = ['id', 'Ten', 'Email', 'Admin', 'NhanVien', 'User', 'Action'];
    dataSource;
    isLoading = false
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    constructor (
        private userService: UserService,
        private loginService: LoginService
    ) { }
    ngOnInit() {
        this.loadData()
    }
    loadData() {
        this.isLoading = true
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data
            }, err => { console.log(err) }),
            this.userService.currentUser.subscribe(data => {
                if (Number.parseInt(this.idtab + '') == 0) {
                    this.users = data.filter(e => {
                        return Number.parseInt(e.status + '') === 1
                    })
                } else {
                    this.users = data.filter(e => {
                        return e.idQuyen == this.idtab && Number.parseInt(e.status + '') == 0
                    })
                }

                // this.dataSource = new MatTableDataSource<User>(this.users);
                // this.dataSource.paginator = this.paginator;
                // this.dataSource.sort = this.sort;
                this.nodeUsers = []
                this.users.forEach(e => {
                    this.nodeUsers.push(new NodeUser(e, true))
                })
                this.dataSource = new MatTableDataSource<NodeUser>(this.nodeUsers);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isLoading = false
            }, err => { console.log(err) }).add(() => { })
        )

    }
    onChangeQuyen(e: User, idquyen: number) {
        e.idQuyen = idquyen
        var formData = new FormData();
        formData.append('_method', 'put');
        for (var key in e) {
            formData.append(key, e[key]);
        }
        this.subscriptions.push(
            this.userService.update(formData).subscribe(data => {

            }, err => { console.log(err) })
        )
    }
    onSaveRow(item) {
        var formData = new FormData();
        formData.append('_method', 'put');
        for (var key in item.user) {
            formData.append(key, item.user[key]);
        }
        this.subscriptions.push(
            this.userService.update(formData).subscribe(data => {
                item.isShow = !item.isShow
            }, err => { console.log(err) })
        )
    }
    onLock(item) {
        if (Number.parseInt(item.user.status) === 1) {
            item.user.status = 0
        }
        else {
            item.user.status = 1
        }
        var formData = new FormData();
        formData.append('_method', 'put');
        for (var key in item.user) {
            formData.append(key, item.user[key]);
        }
        this.subscriptions.push(
            this.userService.update(formData).subscribe(data => {
            }, err => { console.log(err) })
        )
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe())
        }
    }

}
