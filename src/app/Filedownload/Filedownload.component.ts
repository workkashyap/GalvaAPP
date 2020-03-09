import { Component, OnInit, Input } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
//import { saveAs } from 'file-saver';
import { DownloadfileService } from "../shared/Downloadfile.service";

@Component({
  selector: "app-filedownload",
  templateUrl: "./Filedownload.component.html",
  styleUrls: ["./Filedownload.component.css"]
})
export class FiledownloadComponent implements OnInit {
  public progress: number;
  public message: string;
  deleteOption: boolean;
  @Input() Filename: string;
  constructor(private http: HttpClient, public service: DownloadfileService) {}
  ngOnInit() {
    this.deleteOption = this.service.deleteOption;
  }

  public download() {
    this.service.downloadFile(this.Filename).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.Response:
            const downloadedFile = new Blob([data.body], {
              type: data.body.type
            });
            const a = document.createElement("a");
            a.setAttribute("style", "display:none;");
            document.body.appendChild(a);
            a.download = this.Filename;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = "_blank";
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        // this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
      }
    );
  }
}
