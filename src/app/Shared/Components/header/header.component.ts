import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LanguageService } from '../../Services/language.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../../Services/data-storage.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { NavbarService } from '../../Services/navbar.service';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header.icons.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  constructor(private language: LanguageService, private router: Router,
    private storage: DataStorageService, private auth: AuthenticationService,
    private navbar: NavbarService, private detect: ChangeDetectorRef) { }

  Role: string;
  ngOnInit() {
    this.ChangeNavbarState();
    this.navbar.RoleChanged.subscribe(() => {
      this.ChangeNavbarState();
      this.detect.detectChanges();
    });
  }

  ChangeNavbarState() {
    if (this.storage.getRole() == null ) {
      this.Role = 'anonymous';
    // tslint:disable-next-line: triple-equals
    } else if (this.storage.getRole() == 'Member' ) {
      this.Role = 'member';
         } else {
      this.Role = 'admin';
         }
  }
  changelang(lang: string) {
    this.language.ChangeLanguage(lang);
  }
  Logout() {
   this.auth.Logout();

  }

  ngOnDestroy() {
    this.navbar.RoleChanged.unsubscribe();
  }

}
