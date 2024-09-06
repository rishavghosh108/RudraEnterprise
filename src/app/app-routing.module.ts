import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { OtpComponent } from './otp/otp.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AddProductComponent } from './add-product/add-product.component';
import { BuyComponent } from './buy/buy.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { SellComponent } from './sell/sell.component';
import { HomeComponent } from './home/home.component';
import { AuthOtpService } from './services/auth-otp.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { BuyingCardComponent } from './buying-card/buying-card.component';
import { FilterComponent } from './filter/filter.component';
import { SellingCardComponent } from './selling-card/selling-card.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'addproduct', component: AddProductComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'buy', component: BuyComponent, canActivate: [AuthGuardService]},
  {path: 'sell', component: SellComponent, canActivate: [AuthGuardService]},
  {path: 'filter', component: FilterComponent, canActivate: [AuthGuardService]},
  {path: 'placeorder', component: PlaceorderComponent, canActivate: [AuthGuardService]},
  {path: 'buyhistory', component: BuyingCardComponent, canActivate: [AuthGuardService]},
  {path: 'sellhistory', component: SellingCardComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forget', component: ForgetComponent},
  {path: 'otp', component: OtpComponent, canActivate: [AuthOtpService]},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
