import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStrangersComponent } from './video-strangers.component';

describe('VideoStrangersComponent', () => {
  let component: VideoStrangersComponent;
  let fixture: ComponentFixture<VideoStrangersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStrangersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStrangersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
