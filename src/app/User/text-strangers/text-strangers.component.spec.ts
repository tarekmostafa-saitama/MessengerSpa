import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStrangersComponent } from './text-strangers.component';

describe('TextStrangersComponent', () => {
  let component: TextStrangersComponent;
  let fixture: ComponentFixture<TextStrangersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextStrangersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStrangersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
