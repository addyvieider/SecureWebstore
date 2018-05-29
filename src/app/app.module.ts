import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from'@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CatalogueItemComponent } from './catalogue-item/catalogue-item.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { RouterModule, Routes } from '@angular/router';
import { CartContentComponent } from './cart-content/cart-content.component';
import { CataloguePageComponent } from './catalogue-page/catalogue-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AuthGuard } from './guards/auth.guard';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch:'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartContentComponent},
  { path: 'shop/product/:id', component: ProductPageComponent},
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogueComponent,
    CatalogueItemComponent,
    LoginComponent,
    ShopComponent,
    CartContentComponent,
    CataloguePageComponent,
    ProductPageComponent,
    UserPageComponent,
    AdminComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, AdminGuard, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
