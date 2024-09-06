import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { PopupService } from '../services/popup.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export interface Product {
  product_id: number;
  product_name: string;
  type: string;
  volume: number;
  qty: number;
  name: string;
  mobile: number;
  date: Date;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  products: Product[]=[]  

  constructor(private api: ApiServiceService, private status: PopupService, private auth:AuthService){
    api.home=false;
    api.add=false;
    api.buy=false;
    api.sell=false;
    api.filter=true;
    api.parchase=false;
    api.sellhistory=false;
  }

  selected?: number;

  start_date_error: boolean=false
  end_date_error: boolean=false

  specific_date_error: boolean=false
  mobile_error: boolean=false

  validateDate() {
    return (control: FormControl) => {
      const today = new Date();
      const selectedDate = new Date(control.value);

      if (selectedDate > today) {
        return { invalidDate: true };
      }
      return null;
    };
  }

  Date_range =new FormGroup({
    start_date: new FormControl('',Validators.required),
    end_date: new FormControl('',Validators.required)
  })

  Specific_Date =new FormGroup({
    specificDate: new FormControl('',Validators.required)
  })

  Mobile_no =new FormGroup({
    mobile: new FormControl('',Validators.required)
  })

  Mobile_Specific = new FormGroup({
    mobile: new FormControl('',Validators.required),
    specificDate: new FormControl('',Validators.required)
  })

  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
  )

  Submit_Date_range(){
    if (!this.Date_range.invalid){
      this.api.Filter(this.Date_range.value,this.headers).subscribe(
        response=>{
          this.products=response.body
        },
          error=>{
            console.log(error.error['message'])
            this.status.Error(error.error['message'])
          }
      )}
      else{
        if(this.Date_range.get('start_date')?.invalid)
          this.start_date_error=true;
        if(this.Date_range.get('end_date')?.invalid)
        this.end_date_error=true;
      }
  }

  Submit_Mobile_Specific(){
    if (!this.Mobile_Specific.invalid){
      this.api.Filter(this.Mobile_Specific.value,this.headers).subscribe(
        response=>{ 
          this.products=response.body
        },
          error=>{
            console.log(error.error['message'])
            this.status.Error(error.error['message'])
          }
      )}
      else{
        if(this.Mobile_Specific.get('specificDate')?.invalid)
          this.specific_date_error=true;
        if(this.Mobile_Specific.get('mobile')?.invalid)
        this.mobile_error=true;
      }

  }

  Submit_Mobile_no(){
    if (!this.Mobile_no.invalid){
      this.api.Filter(this.Mobile_no.value,this.headers).subscribe(
        response=>{ 
          this.products=response.body
        },
          error=>{
            console.log(error.error['message'])
            this.status.Error(error.error['message'])
          }
      )}
      else{
        if(this.Mobile_no.get('mobile')?.invalid)
        this.mobile_error=true;
      }
  }
  Submit_Specific_Date(){
    if (!this.Specific_Date.invalid){
      this.api.Filter(this.Specific_Date.value,this.headers).subscribe(
        response=>{ 
          this.products=response.body
        },
          error=>{
            console.log(error.error['message'])
            this.status.Error(error.error['message'])
          }
      )}
      else{
        if(this.Specific_Date.get('specificDate')?.invalid)
        this.specific_date_error=true;
      }
  }

  today: string = new Date().toISOString().split('T')[0];
  startDate: string = '';
  endDate: string = '';

  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    const startDateObj = new Date(this.startDate);
    const nextDay = new Date(startDateObj);
    nextDay.setDate(startDateObj.getDate() + 1);

    this.endDate = nextDay.toISOString().split('T')[0];
  }
}
