import { DataStorageService } from './data-storage.service';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService, private storage: DataStorageService, @Inject(DOCUMENT) private document: any) {
    translate.addLangs(['ar', 'en']);
    // tslint:disable-next-line: triple-equals
    if (this.storage.getLanguage() == null || this.storage.getLanguage() == 'en') {
      this.translate.use('en');
      this.RemoveArabicCss();
    } else {
      this.translate.use('ar');
      this.AddArabicCss();
    }
  }
  ChangeLanguage(lang: string) {
    this.storage.setLanguage(lang);
    this.translate.use(lang);
    // tslint:disable-next-line: triple-equals
    if (lang == 'ar') { this.AddArabicCss(); } else { this.RemoveArabicCss(); }
  }
  private AddArabicCss() {
    this.document.getElementById('rtl').setAttribute('href', 'http://localhost:4200/assets/css/bootstrap-rtl.css');
    this.document.getElementById('font').setAttribute('href', 'https://fontlibrary.org/face/droid-arabic-kufi');
  }
  private RemoveArabicCss() {
    this.document.getElementById('rtl').removeAttribute('href');
    this.document.getElementById('font').setAttribute('href', 'https://fonts.googleapis.com/css?family=Ubuntu');
  }
}
