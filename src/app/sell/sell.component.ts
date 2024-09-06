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

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
    )

  constructor(private api:ApiServiceService,private message:PopupService, private auth:AuthService){
    api.home=false;
    api.add=false;
    api.buy=false;
    api.sell=true;
    api.filter=false;
    api.parchase=false;
    api.sellhistory=false;

    this.api.AllStock(this.headers).subscribe(
      (response)=>{
        this.api.products=response.body;
        this.products=response.body;
        this.empty_products = this.products.length
      },
      (error)=>{
        console.log(error)
      }
    )
    this.CartValues=this.api.CartValues;
    this.BuyValues=this.api.BuyValues;
  }

  products: {id: number, product_name: string, type: 'qty' | 'gram' | 'ml', volume:number,qty:number}[]=[]

  buttonStates: any;
  cart: boolean=false;

  Back($event: boolean){
    this.cart=!$event;
  }

  Multi1(value:any){
    this.api.CartValues=value;
    this.CartValues=value;
  }
  Multi2(value:any){
    this.api.BuyValues=value;
    this.BuyValues=value;
  }

  Success($event: boolean){
    this.Multi1($event)
    this.Multi2($event)
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

  quantity: any=[]
  volume: any=[]

  CartValues:any[]=[];
  BuyValues:any[]=[];

  AddToCart(id: number,name: string,volume: number,type: string,quantity: number,i:number){
    this.message.Successful('product add successfully')
    this.volume[i] = null;
    this.quantity[i] = null; 

    const ViewItem={name:name, volume:volume, type: type, qty:quantity}
    const BuyItem={id: id, volume:volume, qty: quantity}

    const viewchech=this.api.CartValues.find(item=>item.name===name&&item.volume===volume&&item.type===type)
    const buycheck=this.api.BuyValues.find(item=>item.id===id&&item.volume===volume)
    if (viewchech && buycheck){
      viewchech['qty']+=quantity
      buycheck['qty']+=quantity
    }
    else{
      this.api.CartValues.push(ViewItem)
      this.api.BuyValues.push(BuyItem)
    }
    this.CartValues=this.api.CartValues;
    this.BuyValues=this.api.BuyValues;
  }

  tran:boolean=false;

  goToCart(){
    this.tran=!this.tran;
    console.log(this.CartValues)

    setTimeout(()=>{
      this.cart=!this.cart;
      this.tran=!this.tran;
    },1000);
  }

  deleteById(item:any) {
    const CartValues = this.CartValues.filter(obj => obj.name !== item.name && obj.volume!==item.volume);
    this.Multi1(CartValues);

    const temp=this.products.find(product=>product.product_name==item.name)
    const BuyValues = this.BuyValues.filter(obj => obj.id!==temp?.id && obj.volume!==item.volume)
    this.Multi2(BuyValues)
  }

}
