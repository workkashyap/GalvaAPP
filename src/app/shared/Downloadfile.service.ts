import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse  } from '@angular/common/http';
import 'rxjs/add/operator/map'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadfileService {
deleteOption: boolean;
fileName: string;
constructor(public http: HttpClient) { }

public downloadFile(file: string): Observable<HttpEvent<Blob>> {
  console.log( environment.apiUrl + '/DownLoadFile?file=' + file);
  return this.http.request(new HttpRequest(
    'GET',
    environment.apiUrl + '/DownLoadFile?file=' + file,
    null,
    {
      reportProgress: true,
      responseType: 'blob'
    }));
}
}
