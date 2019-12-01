import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './Shared/Components/page404/page404.component';
import { Page500Component } from './Shared/Components/page500/page500.component';

const routes: Routes = [
 // {path:'404',component:Page404Component},
  {path: 'error', component: Page500Component},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
