import { Routes } from '@angular/router';
import { HomeComponent } from './frontend/components/home/home.component';

import { CartComponent } from './frontend/components/cart/cart.component';

import { LoginComponent } from './frontend/components/login/login.component';
import { ProductsComponent } from './frontend/components/products/products.component';
import { ProductCardComponent } from './frontend/components/product-card/product-card.component';
import { ProductDetailComponent } from './frontend/components/product-detail/product-detail.component';
import { CheckoutComponent } from './frontend/components/checkout/checkout.component';


export const routes: Routes = [
   
    { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent},
    { path: 'products', component: ProductsComponent },
    { path: 'product-card', component: ProductCardComponent },
    { path: 'product-detail', component: ProductDetailComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' }
 
];
