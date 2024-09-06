import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private cookie:CookieService) {}

  // canActivate(): boolean {
  //   if (this.api.otp_token.length>0) {
  //     return true; // Allow access to '/home'
  //   } else {
  //     this.router.navigate(['/login']); // Redirect to '/'
  //     return false;
  //   }
  // }

  canActivate(): boolean{
    const token=this.cookie.get('Authentication')
    if(token){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }
}
