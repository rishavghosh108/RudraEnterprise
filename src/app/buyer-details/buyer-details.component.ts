import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { PopupService } from '../services/popup.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-buyer-details',
  templateUrl: './buyer-details.component.html',
  styleUrls: ['./buyer-details.component.css']
})
export class BuyerDetailsComponent {
  @Output() Buyer = new EventEmitter<{name: string, mobile: number}>();

  buyer=new FormGroup({
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)])
  })
  
  name_error = false
  mobile_error = false

  onInputChange_Name(value: any){
    this.name_error=!value
  }

  onInputChange_Mobile(value: any){
    this.mobile_error=!value
  }
  
  Submit(){
    if (this.buyer.valid) {
      const user = {
        name: this.buyer.get('name')?.value as string,
        mobile: Number(this.buyer.get('mobile')?.value)
      };
      this.Buyer.emit(user);
    }else{
      this.mobile_error = !this.buyer.get('mobile')?.valid
      this.name_error = !this.buyer.get('name')?.valid
    }
  }
  

}
