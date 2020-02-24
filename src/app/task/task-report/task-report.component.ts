import { Component, OnInit } from '@angular/core';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { UserService } from 'src/app/shared/user/user.service';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { PlantService } from 'src/app/shared/plant/plant.service';

@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['././task-report.component.css']
})
export class TaskReportComponent implements OnInit {

  currentUser: User;
  constructor(public service: ActionplanService , public lservice: LoginService,  public uservice: UserService,   public plantservice: PlantService,
    ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));

   }

  ngOnInit() {
    this.uservice.getuserbyid(this.currentUser.id);
    this.service.gettaskreport();
    this.plantservice.getPlantData(this.currentUser.id);
  }
  getusername(id) {
    for (const item of  this.uservice.userlist) {
      if (item.id === id) {
        return item.username;
      }
    }
    return 0;
  }
  ifuser(id) {
    for (const item of  this.uservice.userlist) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }
  getplantname(ev) {
    for (const item1 of  this.plantservice.plantlist) {
      if (item1.plantcode === ev) {
        return item1.plantshortname;
      }
    }
    return 0;
  }

}
