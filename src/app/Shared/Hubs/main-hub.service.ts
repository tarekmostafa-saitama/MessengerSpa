import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class MainHubService {
  Connected: boolean;

  hub :any;
  constructor() {
    this.startConnectionToMainHub();
  }
  startConnectionToMainHub() {
    $.connection.hub.url = environment.apiBaseUrl + 'signalr';
    this.hub = $.connection.mainHub;
    $.connection.hub.start().done(function () {
      console.log('Now connected to MainHub, connection ID=' + $.connection.hub.id);
      this.connected = true;








      // General Methods
      $.connection.hub.error(function (error) {
        console.log('SignalR error: ' + error)
      });

      $.connection.hub.connectionSlow(function () {

      });

      $.connection.hub.reconnected(function () {
      });

      $.connection.hub.disconnected(function () {
        if ($.connection.hub.lastError) 
          { console.log("Disconnected. Reason: " +  $.connection.hub.lastError.message); }
        setTimeout(function () {
          $.connection.hub.start();
        }, 5000); // Restart connection after 5 seconds.
      });

    }).fail(function () {
      console.log('Could not Connect!');
    });
  }

 
 f() {
  this.hub.server.x().fail().done();
}




}
