import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CatalogueItemComponent } from './catalogue-item/catalogue-item.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogueComponent,
    CatalogueItemComponent,
    LoginComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
