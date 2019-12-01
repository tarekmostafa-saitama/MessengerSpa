import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MemberDetailsUnit } from '../Models/member-details-unit';
import { MessageUnit } from '../Models/message-unit';
import { DataStorageService } from '../Services/data-storage.service';
import { environment } from 'src/environments/environment';
import { MessageType } from '../Models/Enums/message-type.enum';
import { SenderType } from '../Models/Enums/sender-type.enum';
import { Router } from '@angular/router';



declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class FriendHubService {


  private GetRealtionId = new Subject<string>(); // Source
  GetRealtionId$ = this.GetRealtionId.asObservable(); // Stream

  private GetUserDetails = new Subject<MemberDetailsUnit>(); // Source
  GetUserDetails$ = this.GetUserDetails.asObservable(); // Stream

  private GetMessages = new Subject<MessageUnit[]>(); // Source
  GetMessages$ = this.GetMessages.asObservable(); // Stream

  private NewMessage = new Subject<{ Message: string, Type: MessageType }>(); // Source
  NewMessage$ = this.NewMessage.asObservable(); // Stream

  private TrackState = new Subject<boolean>(); // Source
  TrackState$ = this.TrackState.asObservable(); // Stream

  private TypingFlagIndicator = new Subject<{ FlagIndicator: boolean, RelationId: string }>(); // Source
  TypingFlagIndicator$ = this.TypingFlagIndicator.asObservable(); // Stream


  Connected: boolean;
  connection: any;
  proxy: any;

  constructor(private storage: DataStorageService,private router: Router) {
    this.connection = $.hubConnection(environment.apiBaseUrl + 'signalr');
    this.proxy = this.connection.createHubProxy('messagesHub');
    this.connection.qs = { 'Destination': 'FriendPage' };
    this.ClientMethods();
    this.startConnectionToFriendrHub();


  }

  private startConnectionToFriendrHub(): void {
    this.connection.start().done((data: any) => {

      // General Methods
      this.connection.error(function (error) {
        console.log('SignalR error: ' + error);
      });

      this.connection.connectionSlow(function () {

      });

      this.connection.reconnected(function () {
      });

      this.connection.disconnected(function () {
        if (this.connection.lastError) { console.log('Disconnected. Reason: ' + this.connection.lastError.message); }
        setTimeout(function () {
          this.connection.start();
        }, 5000); // Restart connection after 5 seconds.
      });

    }).fail(function () {
      console.log('Could not Connect!');
    });
  }

  public RoutingTextMessage(relationid: string, message: string) {
    this.proxy.invoke('routingMessage', relationid  , message , SenderType.Friend).done().fail();
}
Typing(flag: boolean, relationid: string) {
    this.proxy.invoke('routingTyping', relationid, flag, SenderType.Friend).done().fail();
  }
public RoutingImageMessage(relationid: string, path: string) {
    this.proxy.invoke('routingImageMessage', {relationid : relationid , path : path , sender : SenderType.Friend}).done().fail();
}
public RoutingTyping(relationid: string, Type: string) {
    this.proxy.invoke('routingTyping', {relationid : relationid , Type : Type , sender : SenderType.Friend}).done().fail();
}
public Disconnect() {
  this.proxy.invoke('friendOffline').done().fail();
}
public SetupEnvironment(SecretKey: string, UserName: string) {

    this.proxy.invoke('setupFriendEnvironment', SecretKey ,  UserName)
    .done((data) => {
        this.GetRealtionId.next(data);
    }).fail((error) => {
      this.router.navigate(['error'], {queryParams : { e : 'nf' } });
    });
}

  // Hub Clients Methods
  ClientMethods() {
    this.proxy.on('notify', (data: string) => {
      console.log('Received in MemberHub Service: ' + JSON.stringify(data));
  });
  this.proxy.on('displayDetails', (data: MemberDetailsUnit) => {
      this.GetUserDetails.next(data);
  });
  this.proxy.on('placeChat', (data: MessageUnit[]) => {
      this.GetMessages.next(data);
  });
  this.proxy.on('typingIndicator', (data: {FlagIndicator: boolean, RelationId: string}) => {
      this.TypingFlagIndicator.next(data);
  });
  this.proxy.on('recieveMessage', (relationid: string, msg: string, type: MessageType) => {
      this.NewMessage.next({Message : msg, Type: type});
  });

  this.proxy.on('changeState', (State: boolean) => {
    this.TrackState.next(State);
});

  }
}
