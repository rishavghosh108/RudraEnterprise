import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiServiceService } from '../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  name: string="";
  mobile!: number;

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
  )

  constructor(private api: ApiServiceService,private auth: AuthService){
    if(!(api.name && api.mobile)){
    api.Profile(this.headers).subscribe(
      response=>{
        api.name=response.body['name']
        this.name=response.body['name']
        api.mobile=response.body['mobile']
        this.mobile=response.body['mobile']
      }
    )}
    else{
      this.name=api.name
      this.mobile=api.mobile
    }
  }
  Logout(){
    this.auth.RemoveToken()
    window.location.reload();
  }
}
