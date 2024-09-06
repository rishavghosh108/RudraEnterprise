import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiServiceService } from './services/api-service.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { OtpComponent } from './otp/otp.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BuyComponent } from './buy/buy.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { BackheaderComponent } from './backheader/backheader.component';
import { SellComponent } from './sell/sell.component';
import { HomeComponent } from './home/home.component';
import { HometemplateComponent } from './hometemplate/hometemplate.component';
import { LogoComponent } from './logo/logo.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BuyerDetailsComponent } from './buyer-details/buyer-details.component';
import { ProfileComponent } from './profile/profile.component';
import { FilterComponent } from './filter/filter.component';
import { BuyingCardComponent } from './buying-card/buying-card.component';
import { SellingCardComponent } from './selling-card/selling-card.component';
import { InvoiceCardComponent } from './invoice-card/invoice-card.component';
import { PurchesInvoiceComponent } from './purches-invoice/purches-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgetComponent,
    OtpComponent,
    AddProductComponent,
    BuyComponent,
    PlaceorderComponent,
    BackheaderComponent,
    SellComponent,
    HomeComponent,
    HometemplateComponent,
    LogoComponent,
    CartComponent,
    NotfoundComponent,
    PaginationComponent,
    BuyerDetailsComponent,
    ProfileComponent,
    FilterComponent,
    BuyingCardComponent,
    SellingCardComponent,
    InvoiceCardComponent,
    PurchesInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [ApiServiceService,AuthService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private api: ApiServiceService) {
    api.url = environment.url;
  }
}
