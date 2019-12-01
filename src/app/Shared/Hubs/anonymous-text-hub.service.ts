import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnonymousMessageUnit } from '../Models/anonymous-message-unit';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../Services/authentication.service';
import { DataStorageService } from '../Services/data-storage.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AnonymousTextHubService {
  Connected: boolean;

  connection: any;
  proxy: any;


  private MessageRecieved = new Subject<AnonymousMessageUnit>(); // Source
  MessageRecieved$ = this.MessageRecieved.asObservable(); // Stream

  private TypingIndicator = new Subject<boolean>(); // Source
  TypingIndicator$ = this.TypingIndicator.asObservable(); // Stream

  constructor(private translate: TranslateService, private auth: AuthenticationService, private storage: DataStorageService) {
    this.connection = $.hubConnection(environment.apiBaseUrl + 'signalr');
    this.proxy = this.connection.createHubProxy('anonymousHub');
    this.connection.qs = {'token': this.storage.getToken()};
    this.ClientMethods();
    this.startConnectionToTextStrangersHub();


  }
  startConnectionToTextStrangersHub() {
    const context = this;
    this.connection.start().done((data: any) => {
      console.log('connected to strangers');
      this.Connected = true;


      // General Methods
      this.connection.error(function (error) {
        console.log('SignalR error: ' + error);
      });

      this.connection.connectionSlow(function () {

      });

      this.connection.reconnected(function () {
      });

      this.connection.disconnected(function () {

        if ($.connection.hub.lastError) { console.log('Disconnected. Reason: ' + this.connection.lastError.message); }
        setTimeout(function () {

          context.connection.start();
        }, 5000); // Restart connection after 5 seconds.
      });

    }).fail(function () {
      console.log('Could not Connect!');
    });
  }
  connectToAnotherSranger() {
    this.connection.stop();

    this.Connected = false;
    this.startConnectionToTextStrangersHub();
  }
  // Hub Clients Methods
  ClientMethods() {
    this.proxy.on('serverMessage', (data: AnonymousMessageUnit) => {
      data.Message = this.translate.instant(data.Message);
      this.MessageRecieved.next(data);
    });
    this.proxy.on('strangerMessage', (data: AnonymousMessageUnit) => {
      this.MessageRecieved.next(data);
    });
    this.proxy.on('changeTyping', (data: boolean) => {
      this.TypingIndicator.next(data);
    });
    this.proxy.on('logoutUser', () => {
      this.auth.Logout();
    });
  }
  RegisterAndConnect() {
    this.proxy.invoke('registerAndConnect').done().fail();
  }
  UnRegister() {
    this.proxy.invoke('leave').done().fail();
  }
  Typing(flag: boolean) {
    this.proxy.invoke('typing', flag).done().fail();
  }
  RoutingText(msg: string) {
    this.proxy.invoke('routing', msg).done().fail();
  }
  RoutingImage(msg: string) {
    this.proxy.invoke('routingImages', msg).done().fail();
  }



}
