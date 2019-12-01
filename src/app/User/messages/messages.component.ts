import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { FriendRelationUnit } from 'src/app/Shared/Models/friend-relation-unit';
import { MessageUnit } from 'src/app/Shared/Models/message-unit';
import { MemberHubService } from 'src/app/Shared/Hubs/member-hub.service';
import { ImagesService } from 'src/app/Shared/Services/images.service';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/Shared/Services/toaster.service';
import { SenderType } from 'src/app/Shared/Models/Enums/sender-type.enum';
import { MessageType } from 'src/app/Shared/Models/Enums/message-type.enum';
import { DataStorageService } from 'src/app/Shared/Services/data-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();


  FriendList: FriendRelationUnit[];
  Messages: MessageUnit[];
  NewMessageInput: string;
  CurrentRelationId: string;
  CurrentFriendName: string;
  TypingIndicator: boolean;
  term: string;

  // For Exporting Enum Values
  MessageType: any = MessageType;
 SenderType: any = SenderType;

  Submitted: boolean;
  updatenicknameform: FormGroup;



  constructor(private hub: MemberHubService, private imageHandler: ImagesService,
    private changeDetectorRef: ChangeDetectorRef, private title: Title,
    private translate: TranslateService, private http: HttpClient,
    private toast: ToasterService, private dataStorage: DataStorageService ) {


    this.hub.FriendList$.pipe(takeUntil(this.componentDestroyed$)).subscribe((FriendList: FriendRelationUnit[]) => {

      this.FriendList = FriendList;
      this.changeDetectorRef.detectChanges();
    });
    this.hub.NewFriend$.pipe(takeUntil(this.componentDestroyed$)).subscribe((Friend: FriendRelationUnit) => {
      Friend.Alert = true;
      this.FriendList.push(Friend);
      this.changeDetectorRef.detectChanges();
    });
    this.hub.GetMessages$.pipe(takeUntil(this.componentDestroyed$)).subscribe((Messages: MessageUnit[]) => {
      this.Messages = Messages;
      this.changeDetectorRef.detectChanges();
    });
    this.hub.TrackState$.pipe(takeUntil(this.componentDestroyed$)).subscribe((data) => {
      this.FriendList.forEach(element => {
        if (element.Id == data.RelationId) {
          element.State = data.State;
        }
      });
      this.changeDetectorRef.detectChanges();
    });
    // tslint:disable-next-line: max-line-length
    this.hub.TypingFlagIndicator$.pipe(takeUntil(this.componentDestroyed$)).subscribe((data: { FlagIndicator: boolean, RelationId: string }) => {
      if (this.CurrentRelationId == data.RelationId) {
        this.TypingIndicator = data.FlagIndicator;
        this.changeDetectorRef.detectChanges();
      }
    });
    this.hub.NewMessage$.pipe(takeUntil(this.componentDestroyed$)).subscribe((data) => {

      console.log(data); // Flag Undifined Here !!!
      if (this.CurrentRelationId == data.RelationId) {
        const msg: MessageUnit = {
          MessageData: data.Message,
          Sender: SenderType.Friend,
          Type: data.Type,
          Date: new Date(moment().format())
        };
        this.Messages.push(msg);
        this.changeDetectorRef.detectChanges();
      } else {

      }
    });
    if (this.hub.Connected) {

      this.hub.SetupEnvironment();
    }
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('messagespage'));
    this.updatenicknameform = new FormGroup({
      'NickName' : new FormControl(null, [Validators.required])
    });
  }
  ChangeNickName() {
    
     this.http.get(environment.apiBaseUrl + 'api/Member/ChangeNickName?NickName='
     + this.updatenicknameform.controls['NickName'].value + '&Id=' + this.CurrentRelationId).subscribe(() => {
        this.toast.Success('', this.translate.instant('messagesNickNameUpdated'));
        this.FriendList.forEach((val, index) => {
          if (val.Id == this.CurrentRelationId) {
            val.NickName = this.updatenicknameform.controls['NickName'].value;
          } else {
            val.Selected = false;
          }
        });
    }, () => {
      this.toast.Error('', this.translate.instant('messagesNickNameNotUpdated'));
    });

  }
  GetChat(id: string) {
    this.FriendList.forEach((val, index) => {
      if (val.Id == id) {
        val.Selected = true;
        this.CurrentFriendName = val.NickName;
        val.Alert = false;
      } else {
        val.Selected = false;
      }
    });
    this.CurrentRelationId = id;
    this.hub.GetChat(this.CurrentRelationId);
  }
  DeleteFriend(id: string) {

    this.http.get(environment.apiBaseUrl + 'api/Member/DeleteFriend?id=' + id).subscribe(() => {
        this.toast.Success('', this.translate.instant('messagesDeleteFriend'));
        this.FriendList = this.FriendList.filter(friend => friend.Id !== id);
        this.changeDetectorRef.detectChanges();
    }, () => {
   //   this.toast.Success('', this.translate.instant('messagesDeleteFriend'));
    });

  }
  Typing(flag: boolean) {
    this.hub.Typing(flag, this.CurrentRelationId);
  }
  SendMessage() {
    if (this.NewMessageInput.trim() == '' || this.NewMessageInput == null) { return; }
    //
    const msg: MessageUnit = {
      MessageData: this.NewMessageInput,
      Sender: SenderType.Me,
      Type: MessageType.TextMessage,
      Date: new Date(moment().format())
    };

    this.Messages.push(msg);
    this.hub.RoutingTextMessage(this.CurrentRelationId, msg.MessageData);
    //
    //
    this.NewMessageInput = '';
  }
  SendImageMessage(event: any) {
    const file: File = event.target.files[0];
    this.imageHandler.UploadMessageImage(file, this.CurrentRelationId, SenderType.Me).subscribe((url: string) => {

      const msg: MessageUnit = {
        MessageData: url,
        Sender: SenderType.Me,
        Type: MessageType.ImageMessage,
        Date: new Date(moment().format())
      };
      this.Messages.push(msg);
    });



  }



  ngOnDestroy() {
    this.hub.Disconnect();

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.changeDetectorRef.detach();
  }

}
