import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MemberService } from 'src/app/Shared/Services/member.service';
import { ProfileDetails } from 'src/app/Shared/Models/profile-details.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  ProDetails: any;
  settingForm: FormGroup;
  constructor(private memberservice: MemberService, private changeDetectorRef: ChangeDetectorRef, private router: ActivatedRoute) {

    }

  ngOnInit() {
    this.settingForm = new FormGroup({
      'AppearInSearch' : new FormControl(),
      'Status' : new FormControl()
    });
    this.ProDetails = this.router.snapshot.data.ProfileInformation;


      this.settingForm.setValue({
        AppearInSearch: this.ProDetails.AppearInSearch,
        Status: this.ProDetails.Status
      });



  }
  UploadProfilePicture(event: any) {

    const file: File = event.target.files[0];
    this.memberservice.UpdateProfilePicture(file).subscribe((data: string) => {
      this.ProDetails.Image = data;
    });
  }
  UpdateSetting() {
    this.memberservice.UpdateMemberSetting(this.settingForm.controls['AppearInSearch'].value,
    this.settingForm.controls['Status'].value).subscribe((Data: ProfileDetails) => {
      this.ProDetails = Data;
    });
  }

}
