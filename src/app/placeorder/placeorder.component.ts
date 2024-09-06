import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent {

  products: any[]=[]
  cartvalues: any[]=[]

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
    )

  constructor(private api: ApiServiceService, private auth:AuthService){
    // this.products=api.products;
    // this.cartvalues=api.cart_value;
  }

  GetProductById(id: number): string{
    const product=this.products.find(p=>p.id===id);
    return product? product.product_name : 'Unknown Product';
  }

  Submit(){
    this.api.Buy(this.cartvalues, this.headers).subscribe(
      response=>{
        console.log(response.body)

      }
    )}

}
