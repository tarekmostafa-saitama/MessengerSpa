import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { FriendComponent } from './friend/friend.component';
import { TextStrangersComponent } from './text-strangers/text-strangers.component';
import { CheckFriendExistenceGuard } from '../Shared/Guards/check-friend-existence.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingComponent } from './setting/setting.component';
import { MemberGuard } from '../Shared/Guards/member.guard';
import { SearchComponent } from './search/search.component';
import { VideoStrangersComponent } from './video-strangers/video-strangers.component';
import { ProfileInformationService } from '../Shared/Resolvers/profile-information.service';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [MemberGuard],
    children: [
      {path: 'messages', component: MessagesComponent},
      {path: 'text-strangers', component: TextStrangersComponent},
      {path: 'video-strangers', component: VideoStrangersComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'setting', component: SettingComponent, resolve: {ProfileInformation: ProfileInformationService}},
      {path: 'search', component: SearchComponent}
    ]
  },
  {path: 'friend/:id', component: FriendComponent, canActivate: [CheckFriendExistenceGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
