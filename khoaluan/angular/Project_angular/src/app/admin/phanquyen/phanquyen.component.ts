import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

class NodeUser {
  user: User;
  isShow: boolean;
  constructor (user: User, isshow: boolean) {
    this.user = user;
    this.isShow = isshow
  }
}
@Component({
  selector: 'app-phanquyen',
  templateUrl: './phanquyen.component.html',
  styleUrls: ['./phanquyen.component.css']
})

export class PhanquyenComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public subscriptions: Subscription[] = []
  nodeUsers: NodeUser[] = []
  columnsToDisplay = ['id', 'Ten', 'Email', 'Admin', 'NhanVien', 'User', 'Action'];
  dataSource;
  isLoading = false
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor (
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadData()
  }
  loadData() {
    this.isLoading = true
    this.subscriptions.push(
      this.userService.currentUser.subscribe(data => {
        this.users = data
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
        console.log(data)
      }, err => { console.log(err) })
    )
  }
  changeStatus(status) {
    console.log(status)
    status = !status;
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
    if (item.user.status === 1) {
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
