import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from "@angular/common/http";
import { PurchaseService } from "../shared/purchase/purchase.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.css"],
})
export class PurchaseComponent implements OnInit {
  @ViewChild("file", { static: false }) file;
  @ViewChild("btnUpload", { static: false }) btnUpload: ElementRef;
  public plzWait: boolean = false;
  public progress: number;
  public message: string;
  readonly rootUrl = environment.apiUrl;
  formData = new FormData();
  public loading = false;
  constructor(
    public toastr: ToastrService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit() {}
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
        this.rootUrl +
          "/FileUploadPurchase?fname=" +
          this.file.nativeElement.files[0].name,
        this.formData,
        { reportProgress: true, observe: "events" }
      )
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          this.plzWait = true;
          this.btnUpload.nativeElement.disabled = true;
        } else if (event.type === HttpEventType.Response) {
          this.message = event.body.toString();
          if (this.message.toString() == "Records Uploaded SuccessFully") {
            this.toastr.success(this.message);
            this.plzWait = false;
            this.btnUpload.nativeElement.disabled = false;
          } else {
            this.plzWait = false;
            this.toastr.info(this.message);
            this.btnUpload.nativeElement.disabled = false;
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
