import { Component } from '@angular/core';
import { MainHubService } from './Shared/Hubs/main-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Messanger';

  constructor() {
    
  }
}
