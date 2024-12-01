import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'display/:id', component: DisplayComponent },
    {path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'order', component: OrderComponent },
    { path: 'order-tracking', component: OrderTrackingComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
];
