import { Component, OnInit, ViewChild } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { VideoHubService } from 'src/app/Shared/Hubs/video-hub.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';


declare var Peer: any;
@Component({
  selector: 'app-video-strangers',
  templateUrl: './video-strangers.component.html',
  styleUrls: ['./video-strangers.component.css']
})

export class VideoStrangersComponent implements OnInit {
  @ViewChild('myvideo') myVideo: any;
  @ViewChild('friendvideo') friendVideo: any;
  peer;
  anotherid;
  mypeerid;
  serverMessage: string;


  componentDestroyed$: Subject<boolean> = new Subject();


  constructor(private videoHub: VideoHubService, private translate: TranslateService) {
    this.serverMessage = 'videoConnecting';
    const p = this;
    this.peer = new Peer();
    setTimeout(() => {
      this.mypeerid = this.peer.id;
    }, 3000);

    this.peer.on('open', function(id) {
      console.log('End Connection To Peer');
      console.log('Id = ' + id);
      console.log('Begin Connection To Hub');
      p.videoHub.startConnectionToVideoHub(id);
     });
     this.peer.on('error', function(err) {
      p.serverMessage = 'videoFailedConnect';
     });
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data) {
        // Will print 'hi!'
        console.log(data);
      });
    });

    this.videoHub.GetWebrtcId$.pipe(takeUntil(this.componentDestroyed$)).subscribe((id: string) => {
      console.log('id recieved = ' + id);
      if (id == undefined || id == null) {

        this.serverMessage = 'videoWaitingStranger';
      }else{
        this.serverMessage = 'videoCallingStranger';
        this.videoconnect(id);

      }
    });

    this.videoHub.GetServerMessage$.pipe(takeUntil(this.componentDestroyed$)).subscribe((message: string) => {
      this.serverMessage = this.translate.instant(message) ;
    });

  }

  ngOnInit() {
    const n = <any>navigator;
    const myvideo = this.myVideo.nativeElement;
    const friendvideo = this.friendVideo.nativeElement;

    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
      n.getUserMedia({video: true, audio: true },
      function(mystream) {
        myvideo.srcObject = mystream;
        myvideo.play();
      }, () => {});

    this.peer.on('call', function(call) {
      n.getUserMedia({video: true, audio: true }, function (remoteStream) {
        call.answer(remoteStream);
        call.on('stream', function(stream) {
          friendvideo.srcObject = stream;
          friendvideo.play();
        });
      }, () => {

      });
    });
  }
  connect() {
    const conn = this.peer.connect(this.anotherid);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function () {
      // here you have conn.id
      conn.send('hi!');
    });


  }
  videoconnect(webrtcId: string) {
    const video = this.friendVideo.nativeElement;
    const localvar = this.peer;
    const fname = webrtcId;

    const n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia({video: true, audio: true }, function(stream) {
      const call = localvar.call(fname, stream);
      call.on('stream', function(remoteStream) {
        video.srcObject = remoteStream;
        video.play();
      });
    }, () => {

    });
  }

}
