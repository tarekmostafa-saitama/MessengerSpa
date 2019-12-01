import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorsLogComponent } from './errors-log/errors-log.component';
import { LiveMonitoringComponent } from './live-monitoring/live-monitoring.component';
import { MembersComponent } from './members/members.component';
import { AdminsComponent } from './admins/admins.component';
import { SidebarComponent } from '../Admin/Shared/Components/sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  declarations: [DashboardComponent, ErrorsLogComponent, LiveMonitoringComponent, MembersComponent, AdminsComponent, SidebarComponent]
})
export class AdminModule { }
