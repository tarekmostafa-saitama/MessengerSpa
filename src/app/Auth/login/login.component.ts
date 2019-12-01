import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';
import { ToasterService } from 'src/app/Shared/Services/toaster.service';
import { DataStorageService } from 'src/app/Shared/Services/data-storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/Shared/Services/navbar.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinform: FormGroup;
  constructor(private auth: AuthenticationService, private toaster: ToasterService,
    private router: Router, private navbar: NavbarService, private storage: DataStorageService,
    private title: Title, private translate: TranslateService) { }
  ngOnInit() {
    this.title.setTitle(this.translate.instant('loginpage'));
    this.signinform = new FormGroup({
      'UserName' : new FormControl(null, [Validators.required]),
      'Password' : new FormControl(null, Validators.required)
    });
  }
  Login () {


      this.auth.Login(this.signinform.controls['UserName'].value
      , this.signinform.controls['Password'].value)
      .subscribe((data: any) => {
        this.storage.setToken(data.access_token);
        this.storage.setRole(data.role);
        this.navbar.RoleChanged.emit();
        this.toaster.Success('', this.translate.instant('loginCorrect'));
        if (data.role == 'Member') {
        this.router.navigate(['/messages']);
        } else {
        this.router.navigate(['/dashboard']);
        }

      }, (error) => {

        if (error.status == 400) {
        this.toaster.Error('', this.translate.instant('loginNotCorrect'));
        }


      });
  }

}
