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
  @Output() Buyer= new EventEmitter<any>();

  buyer=new FormGroup({
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.pattern(/^\d{10}$/))
  })
  
  
  Submit(){
    this.Buyer.emit(this.buyer.value)
  }
  

}
