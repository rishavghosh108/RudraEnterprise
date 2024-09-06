import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from '../services/popup.service';
import { ApiServiceService } from '../services/api-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor (private router: Router,private api: ApiServiceService, private status:PopupService){}
  img="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"

  signup= new FormGroup({
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)])
  })

  SwitchToLogin(){
    this.router.navigate(['/login'])
  }

  name=false;
  mobile=false;
  password=false;

  onInputChange_Name(value: any){
    this.name=!value
  }

  onInputChange_Mobile(value: any){
    this.mobile=!value
  }

  onInputChange_Password(value: any){
    this.password=!value
  }

  Signup(){
    if (!this.signup.invalid){
      this.api.Signup(this.signup.value).subscribe(
        response=>{ 
          if('successful' in response.body){
            this.api.otp_token=response.headers.get('verification')
            this.status.Successful(response.body['successful'])
            this.router.navigate(['/otp'])
          }},
          error=>{
            console.log(error.error['message'])
            this.status.Error(error.error['message'])
          }
      )}
      else{
        this.name=true;
        this.mobile=true;
        this.password=true;
      }
  }
  
}
