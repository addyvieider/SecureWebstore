import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from'@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


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

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch:'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartContentComponent},
  { path: 'shop/product/:id', component: ProductPageComponent}
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
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
