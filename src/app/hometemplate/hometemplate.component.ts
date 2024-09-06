import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-hometemplate',
  templateUrl: './hometemplate.component.html',
  styleUrls: ['./hometemplate.component.css']
})
export class HometemplateComponent implements OnInit{

  constructor(private api:ApiServiceService, private router:Router){}

  home!:boolean;
  add!:boolean;
  buy!:boolean;
  sell!:boolean;
  filter!:boolean;
  parchase!:boolean;
  sellhistory!:boolean;

  profile: boolean=false;

  ngOnInit(): void {
    this.home=this.api.home;
    this.add=this.api.add;
    this.buy=this.api.buy;
    this.sell=this.api.sell;
    this.filter=this.api.filter;
    this.parchase=this.api.parchase;
    this.sellhistory=this.api.sellhistory;
  }

  Home(){
    this.router.navigate(['/home'])
    setTimeout(()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10000);
  }

  Add(){
    this.router.navigate(['/addproduct'])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  Buy(){
    this.router.navigate(['/buy'])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  Sell(){
    this.router.navigate(['/sell'])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  Filter(){
    this.router.navigate(['/filter'])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  Parchase(){
    this.router.navigate(['/buyhistory'])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  Sellhistory(){
    this.router.navigate(['/sellhistory'])
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ShowProfile(){
    this.profile=!this.profile;
  }

}
