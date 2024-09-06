import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rudra_enterprise';

  height=0
  width=0
  temp: string='';

  constructor(protected api: ApiServiceService, private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    
   console.log(this.api.otp_token)
   this.cdr.detectChanges();
  }
}
