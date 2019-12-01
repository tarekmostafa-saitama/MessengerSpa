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
export class VideoHubService {
  Connected: boolean;

  connection: any;
  proxy: any;


  private GetWebrtcId = new Subject<string>(); // Source
  GetWebrtcId$ = this.GetWebrtcId.asObservable(); // Stream

  private GetServerMessage = new Subject<string>(); // Source
  GetServerMessage$ = this.GetServerMessage.asObservable(); // Stream

  constructor(private translate: TranslateService, private auth: AuthenticationService, private storage: DataStorageService) {
    this.connection = $.hubConnection(environment.apiBaseUrl + 'signalr');
    this.proxy = this.connection.createHubProxy('VideoHub');
    this.connection.qs = {'token': this.storage.getToken()};
    this.ClientMethods();

  }
  startConnectionToVideoHub(webrtcId: string) {
    const context = this;
    this.connection.start().done((data: any) => {
      console.log('End Connection To Hub Successfully');
      this.Connected = true;
      console.log('Begin Registering and connecting');
      this.RegisterAndConnect(webrtcId);

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
<<<<<<< HEAD
    //this.startConnectionToVideoHub();
=======
   
>>>>>>> parent of 5870db2... Revert "Some shit fixation + intro to Video Hub"
  }
  // Hub Clients Methods
  ClientMethods() {
    this.proxy.on('logoutUser', () => {
      this.auth.Logout();
    });
    this.proxy.on('serverMessage', (message: string) => {
     this.GetServerMessage.next(message);
    });
  }
  RegisterAndConnect(webrtcId: string) {
    this.proxy.invoke('registerAndConnect', webrtcId).done((id) =>{
      this.GetWebrtcId.next(id);
    }).fail();
  }
  UnRegister() {
    this.proxy.invoke('leave').done().fail();
  }




}
