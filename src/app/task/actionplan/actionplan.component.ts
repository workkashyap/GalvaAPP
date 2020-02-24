import { Component, OnInit } from '@angular/core';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { UserService } from 'src/app/shared/user/user.service';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { PlantService } from 'src/app/shared/plant/plant.service';

@Component({
  selector: 'app-actionplan',
  templateUrl: './actionplan.component.html',
  styleUrls: ['./actionplan.component.css']
})
export class ActionplanComponent implements OnInit {

  currentUser: User;
  constructor(public service: ActionplanService , public lservice: LoginService,  public uservice: UserService,   public plantservice: PlantService,
    ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));

   }

  ngOnInit() {
    this.service.getactionview();
    this.uservice.getusers();
    this.plantservice.getPlantData(this.currentUser.id);
  }
  getusername(id) {
    for (const item of  this.uservice.alluserlist) {
      if (item.id === id) {
        return item.username;
      }
    }
    return 0;
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
