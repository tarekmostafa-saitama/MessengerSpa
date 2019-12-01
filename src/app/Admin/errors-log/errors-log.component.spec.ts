import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsLogComponent } from './errors-log.component';

describe('ErrorsLogComponent', () => {
  let component: ErrorsLogComponent;
  let fixture: ComponentFixture<ErrorsLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
