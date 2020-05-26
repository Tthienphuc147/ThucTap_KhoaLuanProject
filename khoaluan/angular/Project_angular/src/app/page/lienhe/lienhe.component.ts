import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TinTucService } from 'src/app/services/tin-tuc.service';

@Component({
  selector: 'app-lienhe',
  templateUrl: './lienhe.component.html',
  styleUrls: ['./lienhe.component.css']
})
export class LienHeComponent implements OnInit {
    api_url = environment.api_storage;
    listTinTuc: any;
    param: string;
    page = 1;
    pageSize = 6;
  constructor(private tinTucService: TinTucService) {
   }
  ngOnInit() {

  }

}
