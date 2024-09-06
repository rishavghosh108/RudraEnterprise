import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { PopupService } from '../services/popup.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges{
  @Output() backbutton = new EventEmitter<boolean>();
  @Output() isSuccess = new EventEmitter<any>();
  @Output() item=new EventEmitter<any>();
  @Input() cartvalues:any;
  @Input() buyvalues:any;
  @Input() type:boolean=true;

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
    )

  Sell($event: any){

    const data={
      products: this.api.BuyValues,
      buyer: $event
    }
    
    console.log(data);
    
    this.api.Sell(data,this.headers).subscribe(
      (response)=>{
        this.message.Successful(response.body['successful']);
        setTimeout(() => {
          this.BackButton();
        }, 1000);
        
      },
      (error)=>{
        
        this.message.Error(error.error['message'])
        console.log(error)
      })
  }

  BackButton(){
    this.backbutton.emit(true);
  }

  DeleteProduct(name:string,volume:number){
    const item={name: name,volume: volume}
    this.item.emit(item);
  }

  cartType:boolean=false; //false

  constructor(private api: ApiServiceService, private message:PopupService, private auth:AuthService){}

  ngOnChanges(changes: SimpleChanges) {
    this.cartType = this.buyvalues.length > 0 || this.cartvalues.length > 0;}

  temp:boolean=true;

  Change(){
    this.temp=!this.temp;
  }

  Submit(){
    if(this.type){
    this.api.Buy(this.buyvalues,this.headers).subscribe(
      (response)=>{
        this.message.Successful(response.body['successful']);
        this.isSuccess.emit([]);
        setTimeout(() => {
          this.BackButton()
        }, 3000);
      },
      (error)=>{
        // this.message.Error(error.error['message']) multiple products
        console.log(error)
      }
    )}else{
      this.Change()
    }
  }

}
