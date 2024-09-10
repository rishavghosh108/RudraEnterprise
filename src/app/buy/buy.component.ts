import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { PopupService } from '../services/popup.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  empty_products!: number

  headers = new HttpHeaders(
    { 'auth': this.auth.GetToken() }
  )

  constructor(private api: ApiServiceService, private message: PopupService, private auth: AuthService) {
    api.home=false;
    api.add=false;
    api.buy=true;
    api.sell=false;
    api.filter=false;
    api.parchase=false;
    api.sellhistory=false;

    this.api.AllProducts(this.headers).subscribe(
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

  products: { id: number, product_name: string, type: 'qty' | 'gram' | 'ml' }[] = []

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

  volume: any = []
  quantity: any = []

  AddToCart(id: number, name: string, volume: number, type: string, quantity: number, i: number) {
    this.message.Successful('product added to cart')    

    this.volume[i] = null;
    this.quantity[i] = null;

    const ViewItem = { id: id ,name: name, volume: volume, type: type, qty: quantity }
    const viewcheck = this.api.CartValueb.find(item =>item.id=== id && item.volume === volume && item.type === type)
    
    if (viewcheck) {
      viewcheck['qty'] += quantity
    }else {
      this.api.CartValueb.push(ViewItem)
    }
    
  }


  checkInputs(index: number): void {
    this.buttonStates[index] = !(this.volume[index] && this.quantity[index]);
  }

  isButtonDisabled(index: number): boolean {
    return this.buttonStates[index];
  }

  tran: boolean = false;

  goToCart() {
    this.tran = !this.tran;

    setTimeout(() => {
      this.cart = true;
      this.tran = !this.tran;
    }, 1000);
  }

}
