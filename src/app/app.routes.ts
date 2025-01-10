import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'display/:id', component: DisplayComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },  
    { path: 'order', component: OrderComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'confirmed', component: ConfirmedComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
