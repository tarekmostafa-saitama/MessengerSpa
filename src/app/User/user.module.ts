import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { TextStrangersComponent } from './text-strangers/text-strangers.component';
import { MessagesComponent } from './messages/messages.component';
import { VideoStrangersComponent } from './video-strangers/video-strangers.component';
import { FriendComponent } from './friend/friend.component';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendNamePipe } from '../Shared/Pipes/friend-name.pipe';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingComponent } from './setting/setting.component';
import { SearchComponent } from './search/search.component';
import { AttachHostNamePipe } from '../Shared/Pipes/attach-host-name.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { SearchPipe } from '../Shared/Pipes/search.pipe';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  declarations: [TextStrangersComponent, MessagesComponent, VideoStrangersComponent,
     FriendComponent, FriendNamePipe, AttachHostNamePipe, SearchPipe, ChangePasswordComponent, SettingComponent, SearchComponent] 
})
export class UserModule { }
