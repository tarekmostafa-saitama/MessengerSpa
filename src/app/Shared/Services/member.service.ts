import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }
  UpdateProfilePicture(file: File) {
    const urlendpoint = environment.apiBaseUrl + 'api/Member/UpdateProfilePicture';
    const formdata: FormData = new FormData();
    formdata.append('Image', file);
    return this.http.post(urlendpoint, formdata);
  }
  UpdateMemberSetting(appear: boolean, status: string ) {
    const urlendpoint = environment.apiBaseUrl + 'api/Member/UpdateSetting';

    return this.http.post(urlendpoint, {AppearInSearch : appear, Status: status});
  }
  SearchUsers(username: string) {
    return this.http.get(environment.apiBaseUrl + 'api/Member/Search?name=' + username);

  }
  ProfileDetails() {
    return this.http.get(environment.apiBaseUrl + 'api/Member/ProfileDetails');

  }
}
