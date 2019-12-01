import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterModel } from 'src/app/Shared/Models/register-model';
import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';
import { ToasterService } from 'src/app/Shared/Services/toaster.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthenticationService, private toaster: ToasterService,
    private router: Router, private title: Title, private translate: TranslateService) { }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('registerpage'));
  }
  Register(form: NgForm) {
    const user: RegisterModel = {
      FullName: form.controls['FullName'].value,
      Email: form.controls['Email'].value,
      Password: form.controls['Password'].value,
      ConfirmPassword: form.controls['ConfirmPassword'].value,
      UserName: form.controls['UserName'].value
    };
    this.auth.Regiser(user).subscribe((response) => {

      this.toaster.Success('Success', this.translate.instant('registerSuccess'));
      this.router.navigate(['/login']);
    }, (error) => {

      // what about messages translation from server side
      for (var key in (JSON.parse(JSON.stringify(error))).error.ModelState) {

        this.toaster.Error('', (JSON.parse(JSON.stringify(error))).error.ModelState[key][0]);
      }
    })
  }
}
