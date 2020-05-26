import { DichVuService } from '../../services/dich-vu.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-gioithieu',
  templateUrl: './gioithieu.component.html',
  styleUrls: ['./gioithieu.component.css']
})
export class GioiThieuComponent implements OnInit {
    api_url = environment.api_storage;

  constructor() {
   }
  ngOnInit() {

  }

}
