import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent{

  constructor(private api:ApiServiceService, private router:Router, private status:PopupService){}

  Otp= new FormGroup({
    input1: new FormControl('',[Validators.required,Validators.maxLength(1)]),
    input2: new FormControl('',[Validators.required,Validators.maxLength(1)]),
    input3: new FormControl('',[Validators.required,Validators.maxLength(1)]),
    input4: new FormControl('',[Validators.required,Validators.maxLength(1)]),
    input5: new FormControl('',[Validators.required,Validators.maxLength(1)]),
    input6: new FormControl('',[Validators.required,Validators.maxLength(1)])
  })

  Submit():void{
    const otp ={otp: `${this.Otp.value.input1}${this.Otp.value.input2}${this.Otp.value.input3}${this.Otp.value.input4}${this.Otp.value.input5}${this.Otp.value.input6}`};
    const headers=new HttpHeaders(
      {'verification':this.api.otp_token}
    )
    this.api.Otp(otp,headers).subscribe(
      (response)=>{
        this.status.Successful(response.body['successful'])
        this.router.navigate(['/login'])
      },
      (error)=>{
        this.status.Error(error.error['message'])
      }
      )
  }

  
  moveToNext(event: any, nextInputId: number) {
    const input = event.target;
    if (input.value.length === 1) {
      const nextInput = document.getElementById('input' + nextInputId) as HTMLInputElement;
      nextInput.focus();
    }
  }
}
