import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CatalogueItemComponent } from './catalogue-item/catalogue-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogueComponent,
    CatalogueItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
