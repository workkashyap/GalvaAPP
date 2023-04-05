import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login/login.service';
import { PlantService } from '../shared/plant/plant.service';
import { Plant } from '../shared/plant/plant.model';
import { CaputilsService } from '../shared/caputils/caputils.service';

@Component({
  selector: 'app-hold-report',
  templateUrl: './hold-report.component.html',
  styleUrls: ['./hold-report.component.css']
})
export class HoldReportComponent implements OnInit {

  public currentUser: any;
  public plantcode: any;
  public cols: any[] = [];
  public rowData: any[] = [];
  loading: boolean = false;

  constructor(
    public lservice: LoginService,
    public plantservice: PlantService,
    public caputilsservice: CaputilsService
  ) { this.lservice.currentUser.subscribe(x => (this.currentUser = x)); }

  async ngOnInit() {
    this.loading = true;
    this.cols = [
      { field: "plantcode", header: "Plant Code" },
      { field: "slocation", header: "Location" },
      { field: "matrialname", header: "Material Name" },
      { field: "groupname", header: "Material Group Name" },
      { field: "qty", header: "Quantity" },
      { field: "totvalue", header: "Total Value" },
    ];

    await this.plantservice
      .sgetPlantData(this.currentUser.id)
      .toPromise()
      .then(res => {
        this.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          this.plantservice.splantlist.push(splant);
        });
        this.plantcode = this.plantservice.splantlist[0].plantcode;
      });

    this.caputilsservice.getHoldReport(this.plantcode).subscribe(
      (res: any) => { this.rowData = res; },
      (err: any) => { console.log(err); }
    );
    this.loading = false;

  }

  selectedGrid(ev) {
    this.loading = true;
    this.caputilsservice.getHoldReport(this.plantcode).subscribe(
      (res: any) => { this.rowData = res; },
      (err: any) => { console.log(err); }
    );
    this.loading = false;
  }

}
