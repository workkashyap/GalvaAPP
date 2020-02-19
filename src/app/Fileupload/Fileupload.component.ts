import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { DownloadfileService } from '../shared/Downloadfile.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-fileupload',
  templateUrl: './Fileupload.component.html',
  styleUrls: ['./Fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  public progress: number;
  public message: string;
  public filename: string;
 
  constructor(private http: HttpClient, public service: DownloadfileService) {
   
   }
  ngOnInit() {
    this.filename = this.service.fileName;
  }
  
  upload(files) {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    for (const file of files) {
      formData.append(file.name, file);
    }
    const uploadReq = new HttpRequest('POST', environment.apiUrl + '/Fileupload?fname=' + files[0].name, formData, {
      reportProgress: true,
    });
    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.message = event.body.toString();
        this.service.fileName = files[0].name;
        // localStorage.setItem('fileuploadname', files[0].name);
        console.log(this.message);
      }
    });
    
  }
  
}
