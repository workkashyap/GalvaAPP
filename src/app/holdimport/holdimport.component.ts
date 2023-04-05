import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpEventType,
} from '@angular/common/http';
@Component({
  selector: 'app-holdimport',
  templateUrl: './holdimport.component.html',
  styleUrls: ['./holdimport.component.css']
})

export class HoldimportComponent {

  @ViewChild('file', { static: false }) file;
  public progress: number;
  public message: string;
  readonly rootUrl = environment.apiUrl;
  formData = new FormData();
  public loading = false;
  constructor(
    public toastr: ToastrService,
    private http: HttpClient,
  ) { }

  uploadFile() {
    this.loading = true;
    console.log(this.file.nativeElement.files);
    if (this.file.nativeElement.files.length > 0) {
      this.http
        .post(this.rootUrl + '/ExceltoSqlHold?fname=' + this.file.nativeElement.files[0].name, this.formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = event.body.toString();
            if (this.message.toString() == 'Records Uploaded SuccessFully') {
              this.toastr.success(this.message);
            } else {
              this.toastr.info(this.message);
            }
          }
        });
      this.loading = false;
    }else {
      this.toastr.error('Please select a file');
    }
    this.clearSelectedfile();
  }

  clearSelectedfile() {
    this.file.nativeElement.value = null;
  }

  upload(files) {
    this.formData = new FormData();
    this.message = '  ';
    if (files.length === 0) return;
    for (let file of files) this.formData.append(file.name, file);
  }
}
