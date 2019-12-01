import { Component, OnInit } from '@angular/core';
import { ChangePasswordModel } from 'src/app/Shared/Models/change-password.model';
import { AuthenticationService } from 'src/app/Shared/Services/authentication.service';
import { ToasterService } from 'src/app/Shared/Services/toaster.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
 ChangePasswordModel :ChangePasswordModel = new ChangePasswordModel();
  constructor(private auth :AuthenticationService,private toaster :ToasterService,
     private translate : TranslateService) { }

  ngOnInit() {
  }
  ChangePassword(){

    this.auth.ChangePassword(this.ChangePasswordModel).subscribe(()=>{
      this.toaster.Success('',this.translate.instant('changepasswordSuccess'));
    },(error)=>{
       // what about messages translation from server side
       for (var key in (JSON.parse(JSON.stringify(error))).error.ModelState) {
        
        this.toaster.Error('', (JSON.parse(JSON.stringify(error))).error.ModelState[key][0]);

      }
    });

  }

}
