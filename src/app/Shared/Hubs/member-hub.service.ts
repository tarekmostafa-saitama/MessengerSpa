import { Injectable, NgZone } from '@angular/core';
import { MessageUnit } from '../Models/message-unit';
import { Subject } from 'rxjs';
import { FriendRelationUnit } from '../Models/friend-relation-unit';
import { DataStorageService } from '../Services/data-storage.service';
import { AuthenticationService } from '../Services/authentication.service';
import { ToasterService } from '../Services/toaster.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SenderType } from '../Models/Enums/sender-type.enum';
import { MessageType } from '../Models/Enums/message-type.enum';
import { isEmpty } from 'rxjs/operators';


declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class MemberHubService {

  Connected: boolean;
  connection: any;
  proxy: any;


  private GetMessages = new Subject<MessageUnit[]>(); // Source
  GetMessages$ = this.GetMessages.asObservable(); // Stream

  private NewMessage = new Subject<{RelationId: string, Message: string, Type: MessageType}>(); // Source
  NewMessage$ = this.NewMessage.asObservable(); // Stream

  private FriendList = new Subject<FriendRelationUnit[]>(); // Source
  FriendList$ = this.FriendList.asObservable(); // Stream

  private NewFriend = new Subject<FriendRelationUnit>(); // Source
  NewFriend$ = this.NewFriend.asObservable(); // Stream

  private TrackState = new Subject<{RelationId: string, State: boolean}>(); // Source
  TrackState$ = this.TrackState.asObservable(); // Stream

  private TypingFlagIndicator = new Subject<{FlagIndicator: boolean, RelationId: string}>(); // Source
  TypingFlagIndicator$ = this.TypingFlagIndicator.asObservable(); // Stream

  constructor(private storage: DataStorageService, private auth: AuthenticationService,
      private toaster: ToasterService, private router: Router, private ngZobe: NgZone) {

    this.connection = $.hubConnection(environment.apiBaseUrl + 'signalr');
    this.proxy = this.connection.createHubProxy('messagesHub');
    this.connection.qs = { 'Destination': 'MessagesPage', 'token': this.storage.getToken() };
    this.ClientMethods();
    this.startConnectionToMemberHub();

  }
  startConnectionToMemberHub() {

    const context = this;
    this.connection.start().done((data: any) => {

      this.SetupEnvironment();
      this.Connected = true;


      // General Methods
      this.connection.error(function (error) {
        context.router.navigate(['error'], {queryParams : {e : 'cf'}});
      });

      this.connection.connectionSlow(function () {
        context.toaster.Warning('', 'Slow connection');
      });

      this.connection.reconnected(function () {
        context.toaster.Info('', 'Trying to reconnect');
      });

      this.connection.disconnected(function () {
        if (context.connection.lastError) { console.log('Disconnected. Reason: ' + context.connection.lastError.message); }
        setTimeout(function () {
          context.connection.start();
        }, 5000); // Restart connection after 5 seconds.
      });

    }).fail(function () {
      context.ngZobe.run(() => {
        context.router.navigate(['error'], {queryParams : {e : 'cf'}});
      });
    });
  }


  Typing(flag: boolean, relationid: string) {
    this.proxy.invoke('routingTyping', relationid, flag, SenderType.Me).done().fail();
  }
  public SetupEnvironment() {
    this.proxy.invoke('setupMemberEnvironment').done((FriendList: FriendRelationUnit[]) => {
      this.FriendList.next(FriendList);
  }).fail((err) => {
    this.auth.Logout();
  });
  }
  public Disconnect() {
    this.proxy.invoke('memberOffline').done().fail();
}






  public RoutingTextMessage(relationid: string, message: string) {
    this.proxy.invoke('routingMessage', relationid  , message , SenderType.Me).done()
    .fail((err) => {
      console.log(err);
    });
  }






  // 2 Rounds ??!!
  public RoutingImageMessage(relationid: string, path: string, sender: string) {
    this.proxy.invoke('routingImageMessage', {relationid : relationid , path : path , sender : sender}).done().fail();
  }
  public GetChat(relationid: string) {
    this.proxy.invoke('getMemberChat', relationid).done((Data: MessageUnit[]) => {
      console.log(Data);
      this.GetMessages.next(Data);
  }).fail();
  }
  public RoutingTyping(relationid: string, Type: string) {
    this.proxy.invoke('routingTyping', {relationid : relationid , Type : Type , sender : SenderType.Me}).done().fail();

  }

  // Hub Clients Methods
  ClientMethods() {
    this.proxy.on('notify', (data: string) => {
      console.log('Received in MemberHub Service: ' + JSON.stringify(data));
  });
  this.proxy.on('typingIndicator', (data: {FlagIndicator: boolean, RelationId: string}) => {
    this.TypingFlagIndicator.next(data);
});
  this.proxy.on('recieveMessage', (relationid: string, msg: string, type: MessageType) => {
      this.NewMessage.next({RelationId: relationid, Message: msg, Type: type});
  });

  this.proxy.on('changeState', (State: boolean, relationid: string) => {
      this.TrackState.next({RelationId: relationid, State: State});
  });
  this.proxy.on('logoutUser', () => {
    this.auth.Logout();
  });
  this.proxy.on('newFriendRelation', (newFriendRelation: FriendRelationUnit) => {
    this.NewFriend.next(newFriendRelation);
    this.proxy.invoke('registerMemberForNotification', newFriendRelation.Id).done().fail();
});

  }
}
