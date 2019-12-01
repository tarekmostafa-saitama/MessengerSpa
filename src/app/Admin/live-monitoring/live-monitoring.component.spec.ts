import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMonitoringComponent } from './live-monitoring.component';

describe('LiveMonitoringComponent', () => {
  let component: LiveMonitoringComponent;
  let fixture: ComponentFixture<LiveMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
