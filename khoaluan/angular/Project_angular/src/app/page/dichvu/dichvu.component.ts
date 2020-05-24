import { DichVuService } from './../../services/dich-vu.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dichvu',
  templateUrl: './dichvu.component.html',
  styleUrls: ['./dichvu.component.css']
})
export class DichVuComponent implements OnInit {
    api_url = environment.api_storage;
    listDichVu: any;
    param: string;
    page = 1;
    pageSize = 6;
  constructor(private dichVuService: DichVuService) {
   }
  ngOnInit() {
    this.dichVuService.getAllDichVu().subscribe(res =>{
        this.listDichVu = res.data;
    })
  }

}
