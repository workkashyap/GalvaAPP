import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldReportComponent } from './hold-report.component';

describe('HoldReportComponent', () => {
  let component: HoldReportComponent;
  let fixture: ComponentFixture<HoldReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
