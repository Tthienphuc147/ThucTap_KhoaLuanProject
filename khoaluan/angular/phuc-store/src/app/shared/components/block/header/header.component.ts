import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  products: Product[];
  indexProduct: number;
  public sidenavMenuItems: Array<any>;
  shoppingCartItems: CartItem[] = [];

  constructor() {
    // this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
   }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }
  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }


}
