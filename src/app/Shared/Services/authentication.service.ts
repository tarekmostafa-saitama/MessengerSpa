import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataStorageService } from './data-storage.service';
import { Router } from '@angular/router';
import { LanguageService } from './language.service';
import { RegisterModel } from '../Models/register-model';
import { NavbarService } from './navbar.service';
import { ChangePasswordModel } from '../Models/change-password.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private storage: DataStorageService, private router: Router,
    private navabr: NavbarService, private zone: NgZone) {
  }

  Regiser(user: RegisterModel) {
     return this.http.post(environment.apiBaseUrl + 'api/Account/Register', user);
  }
  Login(username: string, password: string) {
      const data = 'username=' + username + '&password=' + password + '&grant_type=password';
      const header = new HttpHeaders({'content-type': 'application/x-www-urlencoded'});
      return this.http.post(environment.apiBaseUrl + 'token', data, {headers: header});
   }
   ChangePassword(changepassword: ChangePasswordModel) {

    return this.http.post(environment.apiBaseUrl + 'api/Account/ChangePassword', changepassword);
 }
   Logout() {
    this.storage.removeToken();
    this.storage.removeRole();
   // this.zone.run(() => {
        this.navabr.RoleChanged.emit();
        this.router.navigate(['/login']);
   // });
  }
}
