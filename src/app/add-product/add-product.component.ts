import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { PopupService } from '../services/popup.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  productname:boolean=false;
  selecedtype: boolean=false;

  addproduct!: FormGroup;

  types = [
    { value: 'piece', viewValue: 'piece' },
    { value: 'gram', viewValue: 'gram' },
    { value: 'ml', viewValue: 'ml' }
  ];


  constructor(private fb: FormBuilder,private apiService:ApiServiceService, private status:PopupService, private auth:AuthService) {
    apiService.home=false;
    apiService.add=true;
    apiService.buy=false;
    apiService.sell=false;
    apiService.filter=false;
    apiService.parchase=false;
    apiService.sellhistory=false;
   }

  ngOnInit(): void {
    this.addproduct = this.fb.group({
      type: ['', Validators.required],
      product_name: ['', Validators.required]
    });
  }
  
  headers=new HttpHeaders(
    {'auth':this.auth.GetToken()}
  )

  submit(): void{    //this method is for add the product to cart
    if(this.addproduct.valid){
      this.apiService.AddProduct(this.addproduct.value, this.headers).subscribe(
        (response)=>{
          this.status.Successful(response.body['successful'])
        },
        (error)=>{
          this.status.Error(error.error['message'])
        }
      )
      this.addproduct.reset();
    }else{
      this.productname=true;
      this.selecedtype=true;
    }
  }
}