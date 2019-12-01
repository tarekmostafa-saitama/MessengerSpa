import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorsLogComponent } from './errors-log/errors-log.component';
import { LiveMonitoringComponent } from './live-monitoring/live-monitoring.component';
import { AdminsComponent } from './admins/admins.component';
import { AdminGuard } from '../Shared/Guards/admin.guard';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AdminGuard],
    children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'members',component:MembersComponent},
    {path:'admins',component:AdminsComponent},
    {path:'errors-log',component:ErrorsLogComponent},
    {path:'live-monitoring',component:LiveMonitoringComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
