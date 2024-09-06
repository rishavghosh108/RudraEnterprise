import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  home:boolean=true;
  add:boolean=false;
  buy:boolean=false;
  sell:boolean=false;
  filter:boolean=false;
  parchase:boolean=false;
  sellhistory:boolean=false;

  constructor(private http: HttpClient) {}

  otp_token: string='';
  CartValueb:  {name:string,volume:number, type: string, qty:number}[] = [];
  BuyValueb:  {id:number,volume:number,qty:number}[] = [];
  CartValues:  {name:string,volume:number, type: string, qty:number}[] = [];
  BuyValues:  {id:number,volume:number,qty:number}[] = [];
  products!: {id: number, product_name: string, type: 'qty' | 'gram' | 'ml'}[];
  allstocks=[];

  name!: string;
  mobile!: number;

  private url: string="https://rudra-enterprise.onrender.com";

  private signup_url=this.url+"/system/signup";
  private login_url=this.url+"/system/login";
  private forget_url=this.url+"/system/forget";
  private otp_url=this.url+"/system/otpverify";
  private profile_url=this.url+"/system/profile";

  private addproduct_url=this.url+"/addproduct";
  private allproduct_url=this.url+"/all_products";
  private buy_url=this.url+"/buy";
  private allstock_url=this.url+"/all_stocks";
  private sell_url=this.url+"/sell";
  private filter_url=this.url+"/filter"
  private buyinghistory_url=this.url+"/buyinghistory"
  private sellinghistory_url=this.url+"/sellinghistory"
  private purchesinvoice_url=this.url+"/buyinginvoice"
  private sellinvoice_url=this.url+"/sellinvoice"

  Signup(body:any): Observable<any>{
    return this.http.post<HttpResponse<any>>(this.signup_url,body,{ observe: 'response'});
  }
  Otp(body:any, headers: HttpHeaders):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.otp_url,body, {headers, observe: 'response'});
  }
  Login(body:any):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.login_url,body,{ observe: 'response'})
  }
  Forget(body:any):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.forget_url,body,{ observe: 'response'})
  }
  Profile(headers: HttpHeaders):Observable<any>{
    return this.http.get<HttpResponse<any>>(this.profile_url,{headers, observe: 'response'})
  }


  AddProduct(body:any, headers: HttpHeaders):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.addproduct_url,body,{headers, observe: 'response'});
  }
  AllProducts(headers: HttpHeaders):Observable<any>{
    return this.http.get<HttpResponse<any>>(this.allproduct_url,{headers, observe: 'response'});
  }
  Buy(body:any, headers: HttpHeaders):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.buy_url,body,{headers, observe: 'response'});
  }
  AllStock(headers: HttpHeaders):Observable<any>{
    return this.http.get<HttpResponse<any>>(this.allstock_url,{headers, observe: 'response'});
  }
  Sell(body:any, headers: HttpHeaders):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.sell_url,body,{headers, observe: 'response'});
  }
  Filter(body:any, headers: HttpHeaders):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.filter_url,body,{headers, observe: 'response'})
  }
  BuyingHistory( headers: HttpHeaders):Observable<any>{
    return this.http.get<HttpResponse<any>>(this.buyinghistory_url,{headers, observe: 'response'})
  }
  SellingHistory( headers: HttpHeaders):Observable<any>{
    return this.http.get<HttpResponse<any>>(this.sellinghistory_url,{headers, observe: 'response'})
  }
  PurchesInvoice( headers: HttpHeaders,body: any):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.purchesinvoice_url,body,{headers, observe: 'response'})
  }
  SellInvoice(body: any, headers: HttpHeaders):Observable<any>{
    return this.http.post<HttpResponse<any>>(this.sellinvoice_url,body,{headers, observe: 'response'})
  }
}
