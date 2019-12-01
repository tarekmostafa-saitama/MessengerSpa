import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnonymousMessageUnit } from 'src/app/Shared/Models/anonymous-message-unit';
import { AnonymousTextHubService } from 'src/app/Shared/Hubs/anonymous-text-hub.service';
import * as moment from 'moment';
import { ImagesService } from 'src/app/Shared/Services/images.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-text-strangers',
  templateUrl: './text-strangers.component.html',
  styleUrls: ['./text-strangers.component.css']
})
export class TextStrangersComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  Messages: AnonymousMessageUnit[] = [];
  NewMessage: string;
  TypingIndicator: boolean;
  Host: string;
  constructor(private hub: AnonymousTextHubService, private changeDetectorRef: ChangeDetectorRef,
    private imageHandler: ImagesService, private title: Title, private translate: TranslateService) {

    this.Host = environment.apiBaseUrl;

    this.hub.MessageRecieved$.pipe(takeUntil(this.componentDestroyed$)).subscribe((data: AnonymousMessageUnit) => {

      this.Messages.push(data);
      this.changeDetectorRef.detectChanges();
    });
    this.hub.TypingIndicator$.pipe(takeUntil(this.componentDestroyed$)).subscribe((data: boolean) => {
      this.TypingIndicator = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  SendMessage() {
    this.Messages.push({ Message: this.NewMessage, Date: new Date(moment().format()), Sender: 'Me', Type: 'T' });
    this.hub.RoutingText(this.NewMessage);
  }
  SendImageMessage(event: any) {
    const file: File = event.target.files[0];
    this.imageHandler.UploadAnonymousImage(file).subscribe((url: string) => {

      let msg: AnonymousMessageUnit = {
        Message: url,
        Sender: 'Me',
        Type: 'I',
        Date: new Date(moment().format())
      };
      this.Messages.push(msg);
      this.hub.RoutingImage(url);
    });


  }
  Typing(flag: boolean) {
    this.hub.Typing(flag);
  }
  ChangeStranger() {
    this.Messages = [];
    this.hub.connectToAnotherSranger();
  }
  ngOnInit() {
    this.title.setTitle(this.translate.instant('textstrangerspage'));
    if (this.hub.Connected) {
      this.hub.RegisterAndConnect();
    }

  }
  ngOnDestroy() {
    this.hub.UnRegister();

    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.changeDetectorRef.detach();
  }


}
