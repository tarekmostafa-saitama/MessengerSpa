import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FriendHubService } from 'src/app/Shared/Hubs/friend-hub.service';
import { ImagesService } from 'src/app/Shared/Services/images.service';
import { MemberDetailsUnit } from 'src/app/Shared/Models/member-details-unit';
import { MessageUnit } from 'src/app/Shared/Models/message-unit';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { SenderType } from 'src/app/Shared/Models/Enums/sender-type.enum';
import { MessageType } from 'src/app/Shared/Models/Enums/message-type.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  Host: string;
  Connected: Boolean;
  UserName: string;
  SecretKey: string;
  RelationId: string;
  UserDetails: MemberDetailsUnit;
  Messages: MessageUnit[];
  NewMessage: string;
  TypingIndicator: boolean;

    // For Exporting Enum Values
    MessageType: any = MessageType;
    SenderType: any = SenderType;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private hub: FriendHubService, private changeDetectorRef: ChangeDetectorRef,
  private imageHandler: ImagesService, private title: Title) {
    this.Host = environment.apiBaseUrl;

    this.hub.GetRealtionId$.pipe(takeUntil(this.componentDestroyed$)).subscribe((id) => {
      this.RelationId = id;
      });
      this.hub.GetMessages$.pipe(takeUntil(this.componentDestroyed$)).subscribe((msgs) => {
        this.Messages = msgs;
        this.changeDetectorRef.detectChanges();
      });
      this.hub.NewMessage$.pipe(takeUntil(this.componentDestroyed$)).subscribe((newmsg) => {
        let msg: MessageUnit = {
        MessageData : newmsg.Message,
        Sender : SenderType.Me,
        Type : newmsg.Type,
        Date : new Date(moment().format())
        };
        this.Messages.push(msg);
        this.changeDetectorRef.detectChanges();
      });
      this.hub.TypingFlagIndicator$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: {FlagIndicator: boolean, RelationId: string}) => {
        this.TypingIndicator = data.FlagIndicator;
         this.changeDetectorRef.detectChanges();
       });
       this.hub.TrackState$.pipe(takeUntil(this.componentDestroyed$)).subscribe((state: boolean) => {
        this.UserDetails.State = state;
         this.changeDetectorRef.detectChanges();
       });
      this.hub.GetUserDetails$.pipe(takeUntil(this.componentDestroyed$)).subscribe((UserDetails: MemberDetailsUnit) => {
        this.Connected = true;
        this.UserDetails = UserDetails;
        this.changeDetectorRef.detectChanges();

      }, (error) => {
        console.log(error);
      });

   }


  ngOnInit() {
    this.UserName = this.activatedRoute.snapshot.params['id'];
    this.title.setTitle(this.activatedRoute.snapshot.params['id']);

  }
  SetupFriendEnvironment() {
    this.hub.SetupEnvironment(this.SecretKey, this.UserName);
  }
  Typing(flag: boolean) {
    this.hub.Typing(flag, this.RelationId);
  }
  SendMessage() {
    if (this.NewMessage.trim() == '' || this.NewMessage == null || this.Connected == false) { return; }
    let msg: MessageUnit = {
      MessageData : this.NewMessage,
      Sender : SenderType.Friend,
      Type : MessageType.TextMessage,
      Date : new Date(moment().format())
      };

    this.Messages.push(msg);
    //
    this.hub.RoutingTextMessage(this.RelationId, this.NewMessage);
    //
    this.NewMessage = '';
  }
  SendImageMessage(event: any) {
    const file: any = event.target.files[0];
    this.imageHandler.UploadMessageImage(file, this.RelationId, SenderType.Friend).subscribe((url: string) => {

      let msg: MessageUnit = {
        MessageData : url,
        Sender : SenderType.Friend,
        Type : MessageType.ImageMessage,
        Date : new Date(moment().format())
      };
      this.Messages.push(msg);
    });
  }
ngOnDestroy() {
  this.hub.Disconnect();
  this.componentDestroyed$.next(true);
  this.componentDestroyed$.complete();
}
}
