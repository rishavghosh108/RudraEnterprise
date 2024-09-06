import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';

export interface Product {
  date: string;
  product_name: string;
  qty: number;
  type: string;
  volume: number;
}

@Component({
  selector: 'app-buying-card',
  templateUrl: './buying-card.component.html',
  styleUrls: ['./buying-card.component.css']
})
export class BuyingCardComponent {
  products: Product[] | any;
  product_id: any;
  invoice_state: boolean = false

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
  )
  constructor(private api:ApiServiceService, private auth:AuthService, private status:PopupService){
    api.home=false;
    api.add=false;
    api.buy=false;
    api.sell=false;
    api.filter=false;
    api.parchase=true;
    api.sellhistory=false;
    
    api.BuyingHistory(this.headers).subscribe(
      response=>{
        this.products=response.body
      },
      error=>{
        console.log(error.error['message'])
        this.status.Error(error.error['message'])
      }
    )
  }

  ChangeState(data: any){
    this.product_id=data
    this.invoice_state=true
  }
}
