import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcalendarComponent } from './qcalendar.component';

describe('QcalendarComponent', () => {
  let component: QcalendarComponent;
  let fixture: ComponentFixture<QcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
