import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularIbanModule } from 'angular-iban';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './memory.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IbanComponent } from './iban/iban.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    IbanComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	AngularIbanModule,
	ReactiveFormsModule,
	HttpClientModule,
	HttpClientInMemoryWebApiModule.forRoot(
		InMemoryDataService, { dataEncapsulation: false }
	)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
