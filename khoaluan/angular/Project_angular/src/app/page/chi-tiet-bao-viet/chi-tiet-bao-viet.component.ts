import { TinTucService } from './../../services/tin-tuc.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chi-tiet-bao-viet',
  templateUrl: './chi-tiet-bao-viet.component.html',
  styleUrls: ['./chi-tiet-bao-viet.component.css']
})
export class ChiTietBaoVietComponent implements OnInit {
    api_url = environment.api_storage;
    params: string;
    blog: any;
    author: any;
    listBlog: any;
  constructor(private tinTucService: TinTucService,
    private activatedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
      this.params =  this.activatedRoute.params['value'].id;
    this.tinTucService.getTinTuc(this.params)
    .pipe(
      switchMap(res1 => {
        this.blog = res1.data.tintuc;
        this.author = res1.data.admin;
        return this.tinTucService.getTinTucTheoLoai(res1.data.tintuc.id_loai_tin_tucs);
      }),
    )
    .subscribe(res2 => {
     this.listBlog = res2.data;
     console.log(this.listBlog);
    }, err => {

  });
  }
  goToBlog(){
    this.ngOnInit();
  }

}
