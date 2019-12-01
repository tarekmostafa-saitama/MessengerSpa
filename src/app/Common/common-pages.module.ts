import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonPagesRoutingModule } from './common-pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    CommonModule,
    CommonPagesRoutingModule
  ],
  declarations: [
    HomeComponent,
    ContactComponent
  ]
})
export class CommonPagesModule { }
