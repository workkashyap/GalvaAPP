import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dailyproduction } from './dailyproduction.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Itemwiserej } from './itemwiserej.model';
import { TopDefect } from './topdefect.model';
import { DailyReportDisplay } from './dailyreportdisplay.model';
import { DailyReportSummary } from './dailyreportsummary.model';
import { Top5Rejection } from './top5rejection.model';
import { DailyReportDisplayChrome } from './dailyreportdisplaychrome.model';
import { DailyReportDisplaySatin } from './dailyreportdisplaysatin.model';
import { ItemwiseRejDetail } from './itemwiserejdetail.model';

import { TopDefectsummary } from './TopDefectssummary.model';
import { Top5rejectiondefectwise } from './top5rejectiondefectwise.model';

import { Salessummary } from './salessummary.model'
import { Salesdetail } from './salesdetail.model';
import { Purchasesummary } from '../purchase/purchasesummary.model';

@Injectable({
  providedIn: 'root'
})
export class DailyproductionService {
  readonly rootUrl = environment.apiUrl;
  public dailyprodlist: Dailyproduction[] = [];
  public itemwiserejlist: Itemwiserej[] = [];
  public salesdetail: Salesdetail[] = [];
  public itemwiserejdetaillist: ItemwiseRejDetail[] = [];
  public itemtopdefectlist: TopDefect[] = [];
  public loadchart1list: DailyReportDisplay[] = [];
  public dailyreportsummary: DailyReportSummary[] = [];
  public salessummary: Salessummary[] = [];
  public title: string[] = [];
  public date: string;
  public plantcode: string;
  public plantshortname: string;

  public id: number;

  constructor(public http: HttpClient) { }

  // public getDailyPReject(id): any {
  //   return this.http
  //     .get(this.rootUrl + '/dailyproductions/rejectdata/' + id + '/Reject')
  //     .toPromise()
  //     .then(res => {
  //       this.dailyprodlist = res as Dailyproduction[];
  //     });
  // }
  // public getRejectcalendar(id, date): any {
  //   return this.http
  //     .get(this.rootUrl + '/dailyproductions/Getallrejdata/' + id + '/Reject/' + date)
  //     .toPromise()
  //     .then(res => {
  //       this.dailyprodlist = res as Dailyproduction[];
  //       console.log(this.rootUrl + '/dailyproductions/Getallrejdata/' + id + '/Reject/' + date);
  //     });
  // }
  public getDailyPReject(id, startdate, endate): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl +
      '/dailyproductions/rejectdata/' +
      id +
      '/Reject/' +
      startdate +
      '/' +
      endate
    );
  }
  public getDailyPRejectmode(id, mode): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl + '/dailyproductions/rejectdata/' + id + '/Reject/' + mode
    );
  }
  public getRejectcalendar(id, date): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl + '/dailyproductions/Getallrejdata/' + id + '/Reject/' + date
    );
  }

  public getRejectdetail(
    plantcode,
    type,
    fromdate,
    todate
  ): Observable<Itemwiserej[]> {
    return this.http.get<Itemwiserej[]>(
      this.rootUrl +
      '/itemwiserejs/rejectdetaildata/' +
      plantcode +
      '/' +
      type +
      '/' +
      fromdate +
      '/' +
      todate
    );
  }

  public getRejectmaindetail(
    plantcode,
    type,
    fromdate,
    todate
  ): Observable<ItemwiseRejDetail[]> {
    return this.http.get<ItemwiseRejDetail[]>(
      this.rootUrl +
      '/ItemwiseRejDetail/rejectdetailmaindata/' +
      plantcode +
      '/' +
      type +
      '/' +
      fromdate +
      '/' +
      todate
    );
  }

  public getRejectdefectdetail(
    plantcode,
    type,
    fromdate,
    todate,
    code
  ): Observable<TopDefect[]> {
    return this.http.get<TopDefect[]>(
      this.rootUrl +
      '/TopDefectsCodeValue/getalldefects/' +
      plantcode +
      '/' +
      type +
      '/' +
      fromdate +
      '/' +
      todate +
      '/' +
      code
    );
  }


  public getRejectdefectdetail2(
    plantcode,
    type,
    fromdate,
    todate,
    code
  ): Observable<TopDefect[]> {
    return this.http.get<TopDefect[]>(
      this.rootUrl +
      '/TopDefectscodevalue/getalldefectssum/' + plantcode + '/' + type + '/' + fromdate + '/' + todate + '/' + code
    );
  }

  public getprochart(plantcode, type, month): Observable<DailyReportDisplay[]> {
    return this.http.get<DailyReportDisplay[]>(
      this.rootUrl +
      '/DailyReportDisplay/getallchartdetail/' +
      plantcode +
      '/' +
      type +
      '/' +
      month
    );
  }

  public getprochartchrome(
    plantcode,
    type,
    month
  ): Observable<DailyReportDisplayChrome[]> {
    return this.http.get<DailyReportDisplayChrome[]>(
      this.rootUrl +
      '/DailyReportDisplayChrome/getchromedata/' +
      plantcode +
      '/' +
      type +
      '/' +
      month
    );
  }

  public getprochartsatin(
    plantcode,
    type,
    month
  ): Observable<DailyReportDisplaySatin[]> {
    return this.http.get<DailyReportDisplaySatin[]>(
      this.rootUrl +
      '/DailyReportDisplaySatin/getsatindata/' +
      plantcode +
      '/' +
      type +
      '/' +
      month
    );
  }

  public getprochartdefect(
    plantcode,
    type,
    month
  ): Observable<TopDefectsummary[]> {
    return this.http.get<TopDefectsummary[]>(
      this.rootUrl +
      '/TopDefectssummary/gettopdefectsummary/' +
      plantcode +
      '/' +
      type +
      '/' +
      month
    );
  }

  public getprochartsummary(plantcode, type, month): any {
    return this.http
      .get(
        this.rootUrl +
        '/DailySummaryReport/getallchartsummary/' +
        plantcode +
        '/' +
        type +
        '/' +
        month
      )
      .toPromise()
      .then(res => {
        this.dailyreportsummary = res as DailyReportSummary[];
      });
  }

  public gettop5rejection(plantcode, type, month): Observable<Top5Rejection[]> {
    return this.http.get<Top5Rejection[]>(
      this.rootUrl +
      '/Top5Rejection/gettop5rejection/' +
      plantcode +
      '/' +
      type +
      '/' +
      month
    );
  }
  //sales calendar
  public gettop5rejectiondefectwise(
    plantcode,
    type,
    month
  ): Observable<Top5rejectiondefectwise[]> {
    console.log(this.rootUrl +
      '/Top5RejectionDefectwise/gettop5rejectiondefectwise/' +
      plantcode +
      '/' +
      type +
      '/' +
      month);
    return this.http.get<Top5rejectiondefectwise[]>(
      this.rootUrl +
      '/Top5RejectionDefectwise/gettop5rejectiondefectwise/' +
      plantcode +
      '/' +
      type +
      '/' +
      month
    );
  }

  public getSalesCalendar(id, date): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl + '/Salescalendars/getsalescalendar/' + id + '/' + date
    );
  }
  public getSaleCaldetail(plantcode, date): Observable<Salesdetail[]> {
    return this.http.get<Salesdetail[]>(
      this.rootUrl +
      '/Salescalendars/getsale/' +
      plantcode +
      '/' +
      date
    );
  }

  public getSales(plantcode, date, url): Observable<Salesdetail[]> {
    return this.http.get<Salesdetail[]>(
      this.rootUrl +
      '/Salescalendars/' + url + '/' +
      plantcode +
      '/' +
      date
    );
  }
  //sales detail
  public getSalesDetail(plantcode, from_date, to_date): Observable<Salesdetail[]> {
    return this.http.get<Salesdetail[]>(
      this.rootUrl +
      '/sales/getsales/' + plantcode + '/NULL/' + from_date + '/' + to_date
    );
  }
  //sales detail

  public getNetSale(plantcode, date): Observable<Salessummary[]> {
    return this.http.get<Salessummary[]>(
      this.rootUrl + '/Salescalendars/netsale/' + plantcode + '/' + date
    );
  }

  public getGrossSale(plantcode, date): Observable<Salessummary[]> {
    return this.http.get<Salessummary[]>(
      this.rootUrl + '/Salescalendars/grosssale/' + plantcode + '/' + date
    );
  }
  public getCancelInvoice(plantcode, date): Observable<Salessummary[]> {
    return this.http.get<Salessummary[]>(
      this.rootUrl + '/Salescalendars/cancelinvoice/' + plantcode + '/' + date
    );
  }
  public getSalesReturn(plantcode, date): Observable<Salessummary[]> {
    return this.http.get<Salessummary[]>(
      this.rootUrl + '/Salescalendars/Salesreturn/' + plantcode + '/' + date
    );
  }

  public getPurchaseBtnInfo(plantcode, date): Observable<Purchasesummary[]> {
    return this.http.get<Purchasesummary[]>(
      this.rootUrl + '/purchasecalendars/purchasegroupmoulded/' + plantcode + '/' + date
    );
  }

  public getNetSaleSummary(date): Observable<Salessummary[]> {
    return this.http.get<Salessummary[]>(
      this.rootUrl + '/Salescalendars/SaleSummary/' + date
    );
  }

}
