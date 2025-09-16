import { Routes } from '@angular/router';
import { DisplayComponent } from './frontend/components/display/display.component';
import { HomeComponent } from './frontend/components/home/home.component';
import { LandingComponent } from './frontend/components/landing/landing.component';
import { CartComponent } from './frontend/components/cart/cart.component';
import { OrderComponent } from './frontend/components/order/order.component';
import { CheckoutComponent } from './frontend/components/checkout/checkout.component';
import { WishlistComponent } from './frontend/components/wishlist/wishlist.component';
import { ConfirmedComponent } from './frontend/components/confirmed/confirmed.component';
import { LoginComponent } from './frontend/components/login/login.component';
import { RegisterComponent } from './frontend/components/register/register.component';
import { authGuard } from './frontend/guards/auth.guard';

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
