import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/AuthGuard';
import { NotificationDetailComponent } from './notification/notification-detail/notification-detail.component';
import { TaskComponent } from './task/task.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HeaderComponent,
      DashboardComponent,
      MainComponent,
      NotificationComponent,
      NotificationDetailComponent,
      TaskComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      NgxPaginationModule,
      AppRoutingModule,
      AngularFontAwesomeModule,
      HttpClientModule,
      FormsModule,
      CalendarModule,
      RouterModule.forRoot([
         {
            path: '',
            component: NotificationComponent,
            canActivate: [AuthGuard]
           
          },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'home',
          component: NotificationComponent,
          canActivate: [AuthGuard]
          
        },
        {
         path: 'notification-detail',
         component: NotificationDetailComponent,
         canActivate: [AuthGuard]
         
        },
       { path: '**', redirectTo: '' },
      ]),
      ToastrModule.forRoot(),
    
      NgxLoadingModule.forRoot({})
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
