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
import { FullCalendarModule } from "@fullcalendar/angular";
import { TableModule } from "primeng/table";

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
import { PendingtaskComponent } from "./approval/pendingtask/pendingtask.component";
import { PendingtaskdetailComponent } from "./approval/pendingtask/pendingtask-detail/pendingtask-detail.component";
import { NewTaskComponent } from "./task/new-task/new-task.component";
import { CompletedtaskComponent } from "./approval/completedtask/completedtask.component";
import { OpentaskComponent } from "./approval/opentask/opentask.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { RejectionComponent } from "./rejection/rejection.component";
import { RejectionDetailComponent } from "./rejection/rejection-detail/rejection-detail.component";
import { OpentaskDetailComponent } from "./approval/opentask/opentask-detail/opentask-detail.component";
import { CompletedTaskDetailComponent } from "./approval/completedtask/completed-task-detail/completed-task-detail.component";
import { ChartComponent } from "./chart/chart.component";
import { Ng5SliderModule } from "ng5-slider";
import { AutoCompleteModule } from 'primeng/autocomplete';

import { FileuploadComponent } from "./Fileupload/Fileupload.component";
import { FiledownloadComponent } from "./Filedownload/Filedownload.component";
import { ActionplanComponent } from "./task/actionplan/actionplan.component";
import { TaskReportComponent } from "./task/task-report/task-report.component";
import { RejectionMainComponent } from "./rejection/rejection-main/rejection-main.component";
import { HolnbuffComponent } from "./holnbuff/holnbuff.component";
import { Top5RejDefectwiseComponent } from "./top5-rej-defectwise/top5-rej-defectwise.component";
import { SalesComponent } from "./sales/sales.component";
import { CreateactionplanComponent } from "./createactionplan/createactionplan.component";
import { AddRowDirective } from "./add-row.directive";
import { JobworkmaterialComponent } from "./jobworkmaterial/jobworkmaterial.component";
import { JobwmDetailComponent } from "./jobworkmaterial/jobwm-detail/jobwm-detail.component";
import { NewJobwmComponent } from "./jobworkmaterial/new-jobwm/new-jobwm.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerDetailComponent } from "./customer/customer-detail/customer-detail.component";
import { NewCustomerComponent } from "./customer/new-customer/new-customer.component";
import { HomeComponent } from "./home/home.component";
import { SalescalendarComponent } from "./salescalendar/salescalendar.component";
import { SalesDetailComponent } from "./sales-detail/sales-detail.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { PurchasecalendarComponent } from './purchasecalendar/purchasecalendar.component';
import { PurchaseDetailComponent } from './purchase/purchase-detail/purchase-detail.component';
import { PpcComponent } from './ppc/ppc.component';
import { PpccalendarComponent } from './ppccalendar/ppccalendar.component';
import { RolesComponent } from './roles/roles.component';
import { RolepagesComponent } from './roles/rolepages/rolepages.component';
import { RoletopagesComponent } from './roles/roletopages/roletopages.component';
import { RoletouserComponent } from './roles/roletouser/roletouser.component';
import { CompanytouserComponent } from './roles/compannytouser/companytouser.component';
import { PpcdetailComponent } from './ppccalendar/ppcdetail/ppcdetail.component';
import { ProductionsComponent } from './productions/productions.component';
import { AddproductionComponent } from './productions/addproduction/addproduction.component';
import { AttendancesummaryComponent } from './hr/attendancesummary.component';
import { HrcalendarComponent } from './hr/hrcalendar/hrcalendar.component';
import { MouldproductionComponent } from './mouldproduction/mouldproduction.component';
import { MouldconscalendarComponent } from './mouldconscalendar/mouldconscalendar.component';
import { RoundhoursComponent } from './roundhours/roundhours.component';
import { AddroundhourComponent } from './roundhours/addroundhour/addroundhour.component';
import { RejectionqtyvalueDetailComponent } from './rejection/rejectionqtyvalue-detail/rejectionqtyvalue-detail.component';
import { RejectionvalueDetailComponent } from './rejection/rejectionvalue-detail/rejectionvalue-detail.component';
import { HrcalComponent } from './hrcal/hrcal.component';
import { ItemmstsComponent } from './itemmsts/itemmsts.component';
import { NewItmComponent } from './itemmsts/new-itm/new-itm.component';
import { SalesinfoComponent } from './salesinfo/salesinfo.component';
import { SalesitemComponent } from './salesitem/salesitem.component';
import { PurchaseDetailReportComponent } from './purchase/purchase-detail-report/purchase-detail-report.component';
import { HrnewreportComponent } from './hrnewreport/hrnewreport.component';

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
    PendingtaskComponent,
    PendingtaskdetailComponent,
    NewTaskComponent,
    CompletedtaskComponent,
    OpentaskComponent,
    CalendarComponent,
    RejectionComponent,
    RejectionDetailComponent,
    OpentaskDetailComponent,
    CompletedTaskDetailComponent,
    ChartComponent,
    FileuploadComponent,
    FiledownloadComponent,
    ActionplanComponent,
    TaskReportComponent,
    RejectionMainComponent,
    HolnbuffComponent,
    Top5RejDefectwiseComponent,
    SalesComponent,
    JobworkmaterialComponent,
    JobwmDetailComponent,
    NewJobwmComponent,

    CreateactionplanComponent,
    AddRowDirective,
    CustomerComponent,
    CustomerDetailComponent,
    NewCustomerComponent,
    HomeComponent,
    SalescalendarComponent,
    SalesDetailComponent,
    PurchaseComponent,
    PurchasecalendarComponent,
    PurchaseDetailComponent,
    PpcComponent,
    PpccalendarComponent,
    RolesComponent,
    RolepagesComponent,
    RoletopagesComponent,
    RoletouserComponent,
    CompanytouserComponent,
    PpcdetailComponent,
    AddproductionComponent,
    ProductionsComponent,
    AttendancesummaryComponent,
    HrcalendarComponent,
    MouldproductionComponent,
    MouldconscalendarComponent,
    RoundhoursComponent,
    AddroundhourComponent,
    RejectionqtyvalueDetailComponent,
    RejectionvalueDetailComponent,
    HrcalComponent,
    ItemmstsComponent,
    NewItmComponent,
    SalesinfoComponent,
    SalesitemComponent,
    PurchaseDetailReportComponent,
    HrnewreportComponent
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    Ng5SliderModule,
    FullCalendarModule,
    TableModule,
    CalendarModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "home",
        component: NotificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "notification-detail",
        component: NotificationDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "task",
        component: TaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "task-detail",
        component: TaskDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "task-approve",
        component: ApprovalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pending-task",
        component: PendingtaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pending-task-detail",
        component: PendingtaskdetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "open-task",
        component: OpentaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "opentask-detail",
        component: OpentaskDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "completed-task",
        component: CompletedtaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "completed-task-detail",
        component: CompletedTaskDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "new-task",
        component: NewTaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "calendar",
        component: CalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rejection",
        component: RejectionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rejection-detail",
        component: RejectionDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rejection-main",
        component: RejectionMainComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "dashboard",
        component: ChartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "dashboard1",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "actionview",
        component: ActionplanComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "task-report",
        component: TaskReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "holdnbuff-report",
        component: HolnbuffComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Top5RejDefwise-report",
        component: Top5RejDefectwiseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "createActionPlan",
        component: CreateactionplanComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "jobWorkMaterial",
        component: JobworkmaterialComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "new-jobworkmaterial",
        component: NewJobwmComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "jobworkmaterial-detail",
        component: JobwmDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Sales",
        component: SalesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Customer",
        component: CustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Customer-detail",
        component: CustomerDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "new-Customer",
        component: NewCustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "nhome",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "salescalendar",
        component: SalescalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "salesdetail",
        component: SalesDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "Purchase",
        component: PurchaseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "purchasecalendar",
        component: PurchasecalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "purchasedetail",
        component: PurchaseDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ppcimport",
        component: PpcComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ppccalendar",
        component: PpccalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roles",
        component: RolesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rolepages",
        component: RolepagesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roletopages",
        component: RoletopagesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roletouser",
        component: RoletouserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "companytouser",
        component: CompanytouserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "ppcdetail",
        component: PpcdetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "productions",
        component: ProductionsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "addproduction",
        component: AddproductionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "attendSummary",
        component: AttendancesummaryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "hrcalendar",
        component: HrcalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "mouldproduction",
        component: MouldproductionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "mouldconscalendar",
        component: MouldconscalendarComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roundhours",
        component: RoundhoursComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "addroundhour",
        component: AddroundhourComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rejqty",
        component: RejectionqtyvalueDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rejvalue",
        component: RejectionvalueDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "itemmsts",
        component: ItemmstsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "newItm",
        component: NewItmComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "hrcal",
        component: HrcalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "hrnewreport",
        component: HrnewreportComponent,
        canActivate: [AuthGuard],
      }, {
        path: "salesinfo",
        component: SalesinfoComponent,
        canActivate: [AuthGuard],
      }, {
        path: "salesitem", 
        component: SalesitemComponent,
        canActivate: [AuthGuard],
      }, {
        path: "pdreport", 
        component: PurchaseDetailReportComponent,
        canActivate: [AuthGuard],
      },
      { path: "**", redirectTo: "" },
    ]),
    ToastrModule.forRoot(),

    NgxLoadingModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
