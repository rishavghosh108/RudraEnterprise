import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService:ApiServiceService){
    apiService.home=true;
    apiService.add=false;
    apiService.buy=false;
    apiService.sell=false;
    apiService.filter=false;
    apiService.parchase=false;
    apiService.sellhistory=false;
  }


}
