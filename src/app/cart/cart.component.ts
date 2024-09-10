import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { PopupService } from '../services/popup.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges {
  @Output() backbutton = new EventEmitter<boolean>();
  @Input() type!: boolean;

  temp: boolean = true;
  cartType: boolean = false;

  cartvalues: { id: number, name: string, volume: number, type: string, qty: number }[] = []

  headers = new HttpHeaders({ 'auth': this.auth.GetToken() })

  BackButton() {
    this.backbutton.emit(true);
  }

  DeleteProduct(id: number, volume: number) {
    this.cartvalues = this.cartvalues.filter(item => !(item.id === id && item.volume === volume))
    if(this.type){
      this.api.CartValueb = this.cartvalues
    }else{
      this.api.CartValues = this.cartvalues
    }
  }


  constructor(private api: ApiServiceService, private message: PopupService, private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.type)
      this.cartvalues = this.api.CartValueb
    else
      this.cartvalues = this.api.CartValues

    this.cartType = this.cartvalues.length > 0;
  }

  Change() {
    this.temp = !this.temp;
  }

  Submit() {
    const BuyProducts: { id: number, volume: number, qty: number }[] = [];
    for (const product of this.cartvalues) {
      const temp = { id: product.id, volume: product.volume, qty: product.qty }
      BuyProducts.push(temp);
    }

    if (this.type) {
      this.api.Buy(BuyProducts, this.headers).subscribe(
        (response) => {
          this.message.Successful(response.body['successful']);
          this.cartType = false
          this.api.CartValueb = []

          setTimeout(() => {
            this.BackButton()
          }, 3000);
        },
        (error) => {
          // this.message.Error(error.error['message']) multiple products
          console.log(error)
        })
    } else {
      this.Change()
    }
  }

  Sell($event: any) {
    const BuyProducts: { id: number, volume: number, qty: number }[] = [];
    for (const product of this.cartvalues) {
      const temp = { id: product.id, volume: product.volume, qty: product.qty }
      BuyProducts.push(temp);
    }

    const data = {
      buyer: $event,
      products: BuyProducts
    }

    this.api.Sell(data, this.headers).subscribe(
      (response) => {
        this.message.Successful(response.body['successful']);
        this.cartType = false
        this.api.CartValueb = []
        setTimeout(() => {
          this.BackButton();
        }, 1000);
      },
      (error) => {
        this.message.Error(error.error['message'])
        console.log(error)
      }
    )
  }

}
