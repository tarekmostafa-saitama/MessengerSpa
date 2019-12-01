import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Packages
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'angular2-moment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './User/user.module';
import { CommonPagesModule } from './Common/common-pages.module';
import { AuthModule } from './Auth/auth.module';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { Page404Component } from './Shared/Components/page404/page404.component';
import { Page401Component } from './Shared/Components/page401/page401.component';
import { Page500Component } from './Shared/Components/page500/page500.component';
// Services
import { LanguageService } from './Shared/Services/language.service';
import { DataStorageService } from './Shared/Services/data-storage.service';
import { AuthenticationService } from './Shared/Services/authentication.service';
import { ToasterService } from './Shared/Services/toaster.service';
// Interceptor
import { HttpTrafficInterceptor } from './Shared/Interceptors/http-traffic-interceptor';
import { AttachHostNamePipe } from './Shared/Pipes/attach-host-name.pipe';
import { AdminModule } from './Admin/admin.module';
import { SearchPipe } from './Shared/Pipes/search.pipe';






export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Page404Component,
    Page401Component,
    Page500Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    // Modules
    UserModule,
    AuthModule,
    CommonPagesModule,
    AdminModule,
    AppRoutingModule,
    // Packages
    MomentModule,
    NgxSpinnerModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule.forRoot(),
    NgProgressRouterModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 20000,
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    LanguageService,
    DataStorageService,
    AuthenticationService,
    ToasterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTrafficInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
