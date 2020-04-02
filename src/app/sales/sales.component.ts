import { Component, OnInit, ViewChild } from "@angular/core";
import { Sales } from "../shared/sales/sales.model";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from "@angular/common/http";
import { SalesService } from "../shared/sales/sales.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"]
})
export class SalesComponent {
  @ViewChild("file", { static: false }) file;
  public progress: number;
  public message: string;

  formData = new FormData();
  public loading = false;
  constructor(
    public toastr: ToastrService,
    private http: HttpClient,
    private route: Router
  ) {}

  uploadFile() {
    this.loading = true;
    console.log(this.file.nativeElement.files);
    // const uploadReq = new HttpRequest(
    //   "POST",
    //   "http://localhost:50421/api/ExceltoSql?fname=" +
    //     this.file.nativeElement.files[0].name,
    //   this.formData,
    //   {
    //     reportProgress: true
    //   }
    // );

    // this.http.request(uploadReq).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round((100 * event.loaded) / event.total);
    //   else if (event.type === HttpEventType.Response)
    //     this.message = event.body.toString();
    //   // this.toastr.success(this.message);
    //   this.clearSelectedfile();
    // });

    this.http
      .post(
        "http://localhost:50421/api/ExceltoSql?fname=" +
          this.file.nativeElement.files[0].name,
        this.formData,
        { reportProgress: true, observe: "events" }
      )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = event.body.toString();
          if (this.message.toString() == "Records Uploaded SuccessFully") {
            this.toastr.success(this.message);
          } else {
            this.toastr.info(this.message);
          }
        }
      });

    this.loading = false;
    this.clearSelectedfile();
  }

  clearSelectedfile() {
    this.file.nativeElement.value = null;
  }
  upload(files) {
    this.message = "  ";
    if (files.length === 0) return;

    //  const formData = new FormData();

    for (let file of files) this.formData.append(file.name, file);
  }
}
