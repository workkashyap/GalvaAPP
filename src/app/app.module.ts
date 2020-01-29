import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HeaderComponent,
      DashboardComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFontAwesomeModule,
      RouterModule.forRoot([
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'home',
          component: DashboardComponent
        },
      ]),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
