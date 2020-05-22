import { Cart } from './../../models/cart';
import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DanhMuc } from 'src/app/models/danhmuc';
import { Sanpham } from 'src/app/models/sanpham';
import { Subscription } from 'rxjs';
import { DanhmucService } from 'src/app/services/danhmuc.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { HomePageService } from 'src/app/services/home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  is_loading = true;
  api_url = environment.api_storage;
  mysubdanhmuc: number[] = [];
  danhmucs: DanhMuc[] = [];
  propducts: Product[] = [];
  topSellProduct: Product[] = [];
  sanphamtab: Sanpham[] = [];
  subscriptions: Subscription[] = [];
  isloaded = false;
  constructor(
    private danhmucService: DanhmucService,
    private cartService: CartService,
    private dataService: DataService,
    private homepageService: HomePageService) { }

  ngOnInit() {
    this.is_loading = true;
    this.loadData();
  }
  loadData() {
    this.subscriptions.push(
        this.danhmucService.itemsObs.subscribe(
            data => {
                this.danhmucs = data;
            },
            err => {}
        ),
        this.dataService.currentIsLoaded.subscribe(data => {
            this.isloaded = data;
        }),
        this.homepageService.ProductObs.subscribe(data => {
            if (data && data.length > 0) {
                this.is_loading = false;
                this.propducts = data.slice();
            }
        }),
        this.homepageService.TopSellProductObs.subscribe(data => {
            if (data && data.length > 0) {
                this.is_loading = false;
                this.topSellProduct = data.slice();
            }
        })
    );
  }
onAddCart(sp) {
  this.cartService.addCart(new Cart(sp.id, 1));
  }

}
