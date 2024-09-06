import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {

  mobile:boolean=false;
  password:boolean=false;

  onInputChange_Mobile(value:any){
    this.mobile=!value
  }

  onInputChange_Password(value:any){
    this.password=!value
  }

  constructor (private router: Router, private api:ApiServiceService, private status:PopupService){}

  forget= new FormGroup({
    mobile: new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)])
  })

  SwitchToLogin(){
    this.router.navigate(['/login'])
  }

  submit(){
    if(!this.forget.invalid){
      this.api.Forget(this.forget.value).subscribe(
        response=>{
          if('successful' in response.body){
            this.api.otp_token=response.headers.get('verification')
            this.status.Successful(response.body['successful'])
            this.router.navigate(['/otp'])
          }
        }, error=>{
        this.status.Successful(error.error['message'])
        }
      )}
    else{
      this.mobile=true;
      this.password=true;
    }
  }

}
