import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-selling-card',
  templateUrl: './selling-card.component.html',
  styleUrls: ['./selling-card.component.css']
})
export class SellingCardComponent {
  transaction_details:any

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
  )
  constructor(private api: ApiServiceService, private auth: AuthService){
    api.home=false;
    api.add=false;
    api.buy=false;
    api.sell=false;
    api.filter=false;
    api.parchase=false;
    api.sellhistory=true;

    api.SellingHistory(this.headers).subscribe(
      response=>{
        this.transaction_details=response.body
      },
      error=>{
        console.log(error);
        
      }
    )
  }

}
