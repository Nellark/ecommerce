import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'display/:id', component: DisplayComponent },
    {path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'order-success', component: OrderComponent },
];
