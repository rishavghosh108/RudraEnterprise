import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  isMobile: boolean = false;
    
  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;  // Mobile detection (screen width <= 768px)
  }
}
