import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TinTucService } from 'src/app/services/tin-tuc.service';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {
    api_url = environment.api_storage;
    listTinTuc: any;
    param: string;
    page = 1;
    pageSize = 6;
  constructor(private tinTucService: TinTucService) {
   }
  ngOnInit() {
    this.tinTucService.getAllTinTuc().subscribe(res =>{
        this.listTinTuc = res.data;
        console.log(this.listTinTuc);
    })
  }

}
