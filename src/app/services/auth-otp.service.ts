import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthOtpService {

  constructor(private api: ApiServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.api.otp_token.length>0) {
      return true; // Allow access to '/home'
    } else {
      this.router.navigate(['/login']); // Redirect to '/'
      return false;
    }
  }
}
