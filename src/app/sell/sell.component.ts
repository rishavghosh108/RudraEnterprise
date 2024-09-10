import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { PopupService } from '../services/popup.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent {

  empty_products!: number

  headers = new HttpHeaders({ 'auth': this.auth.GetToken() })

  constructor(private api: ApiServiceService, private message: PopupService, private auth: AuthService) {
    api.home = false;
    api.add = false;
    api.buy = false;
    api.sell = true;
    api.filter = false;
    api.parchase = false;
    api.sellhistory = false;

    this.api.AllStock(this.headers).subscribe(
      (response) => {
        this.api.products = response.body;
        this.products = response.body;
        this.empty_products = this.products.length
      },
      (error) => {
        console.log(error)
      }
    )
  }

  products: { id: number, product_name: string, type: 'qty' | 'gram' | 'ml', volume: number, qty: number }[] = []

  buttonStates: any;
  cart: boolean = false;

  Back($event: boolean) {
    this.cart = !$event;
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    event.target.value = numericValue;
  }

  onKeyPress(event: any) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    const isNumericInput = (event.key >= '0' && event.key <= '9') || allowedKeys.includes(event.key);
    if (!isNumericInput) {
      event.preventDefault();
    }
  }

  quantity: any = []
  volume: any = []

  AddToCart(id: number, name: string, volume: number, type: string, quantity: number, i: number) {

    this.volume[i] = null;
    this.quantity[i] = null;

    const ViewItem = { id: id, name: name, volume: volume, type: type, qty: quantity }
    const viewchech = this.api.CartValues.find(item => (item.id === id && item.volume === volume && item.type === type))

    if ((viewchech && viewchech['qty'] + quantity > this.products[i]['qty']) || (ViewItem['qty'] > this.products[i]['qty'])) {
      this.message.Error('Less no of products available')
    } else {
      if (viewchech) {
        viewchech['qty'] += quantity
      } else {
        this.api.CartValues.push(ViewItem)
      }
      this.message.Successful('product add successfully')
    }

  }

  tran: boolean = false;

  goToCart() {
    this.tran = !this.tran;

    setTimeout(() => {
      this.cart = !this.cart;
      this.tran = !this.tran;
    }, 1000);
  }

}
