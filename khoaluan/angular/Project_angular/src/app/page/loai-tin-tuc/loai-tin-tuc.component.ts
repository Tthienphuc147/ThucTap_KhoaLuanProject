import { TinTucService } from './../../services/tin-tuc.service';

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loai-tin-tuc',
  templateUrl: './loai-tin-tuc.component.html',
  styleUrls: ['./loai-tin-tuc.component.css']
})
export class LoaiTinTucComponent implements OnInit {
    api_url = environment.api_storage;
    listTinTuc: any;
    param: string;
  constructor(private tinTucService: TinTucService,
    private route: ActivatedRoute) {
    this.param = this.route.snapshot.params['id'];
   }

  ngOnInit() {
      this.tinTucService.getAllTinTuc().subscribe(res =>{
          this.listTinTuc = res.data;
          console.log(this.listTinTuc);
      })
  }

}
