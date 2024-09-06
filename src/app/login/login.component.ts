import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private router: Router, private api:ApiServiceService, private auth: AuthService, private status:PopupService){}

  Login= new FormGroup({
    mobile: new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)])
  })

  SwitchToSignup(){
    this.router.navigate(['/signup'])
  }

  SwitchToForget(){
    this.router.navigate(['/forget'])
  }

  mobile=false;
  password=false;

  onInputChange_Mobile(value: any){
    this.mobile=!value
  }

  onInputChange_Password(value: any){
    this.password=!value
  }

  login():void{
    if(!this.Login.invalid){
    this.api.Login(this.Login.value).subscribe(
      (response)=>{
        if( 'successful' in response.body){
          this.auth.SetToken(response.headers.get('auth'))
          this.status.Successful(response.body['successful'])
          this.router.navigate(['/'])
        }
      },
      (error)=>{
        this.status.Error(error.error['message'])
      }
    )}
    else{
      this.mobile=true;
      this.password=true;
    }
  }
}
