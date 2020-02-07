import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgxLoadingModule } from "ngx-loading";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HeaderComponent } from "./header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainComponent } from "./main/main.component";
import { NotificationComponent } from "./notification/notification.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth/AuthGuard";
import { NotificationDetailComponent } from "./notification/notification-detail/notification-detail.component";
import { TaskComponent } from "./task/task.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "primeng/calendar";
import { TaskDetailComponent } from "./task/task-detail/task-detail.component";
import { ApprovalComponent } from "./approval/approval.component";
<<<<<<< HEAD
import { PendingtaskComponent } from './approval/pendingtask/pendingtask.component';
import { PendingtaskdetailComponent } from './approval/pendingtask/pendingtask-detail/pendingtask-detail.component';
=======
import { NewTaskComponent } from "./task/new-task/new-task.component";
>>>>>>> 504fbf1b6f15fabe0673da65b67f7487e85f3873

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    MainComponent,
    NotificationComponent,
    NotificationDetailComponent,
    TaskComponent,
    TaskDetailComponent,
    ApprovalComponent,
<<<<<<< HEAD
    PendingtaskComponent,
    PendingtaskdetailComponent

=======
    NewTaskComponent
>>>>>>> 504fbf1b6f15fabe0673da65b67f7487e85f3873
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
        path: "",
        component: NotificationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "home",
        component: NotificationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "notification-detail",
        component: NotificationDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "task",
        component: TaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "task-detail",
        component: TaskDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "task-approve",
        component: ApprovalComponent,
        canActivate: [AuthGuard]
      },
      {
<<<<<<< HEAD
        path: "pending-task",
        component: PendingtaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "pending-task-detail",
        component: PendingtaskdetailComponent,
=======
        path: "new-task",
        component: NewTaskComponent,
>>>>>>> 504fbf1b6f15fabe0673da65b67f7487e85f3873
        canActivate: [AuthGuard]
      },
      { path: "**", redirectTo: "" }
    ]),
    ToastrModule.forRoot(),

    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
