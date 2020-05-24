
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DichVuService } from 'src/app/services/dich-vu.service';

@Component({
  selector: 'app-chi-tiet-dich-vu',
  templateUrl: './chi-tiet-dich-vu.component.html',
  styleUrls: ['./chi-tiet-dich-vu.component.css']
})
export class ChiTietDichVuComponent implements OnInit {
    api_url = environment.api_storage;
    params: string;
    blog: any;
    author: any;
    listBlog: any;
  constructor(private dichVuService: DichVuService,
    private activatedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
      this.params =  this.activatedRoute.params['value'].id;
    this.dichVuService.getDichVu(this.params)
    .pipe(
      switchMap(res1 => {
        this.blog = res1.data.DichVu;
        this.author = res1.data.admin;
        return this.dichVuService.getDichVuTheoLoai(res1.data.DichVu.id_loai_dich_vu);
      }),
    )
    .subscribe(res2 => {
     this.listBlog = res2.data;
    }, err => {

  });
  }
  goToBlog(){
    this.ngOnInit();
  }

}
