import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login/login.service';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = '';
  public loading = false;
  returnUrl: string;
  constructor(public service: LoginService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {

    if (this.service.currentUserValue) {
      this.router.navigate(['/']);
  }
   }

  ngOnInit() {
    this.resetForm();
    this.service.logout();
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.service.userData = {
      id: 0,
      username: '',
      password: '',
      computername: '',
      ipaddress: '',
      isparent: 0,
      designation: '',
      aboutwork: ''
    };
  }
  OnSubmit(form: NgForm) {
    this.loading = true;
    this.service.login()
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.toastr.error('Invalid User or Password', this.error);
                    this.loading = false;
                });
    }   
  }

