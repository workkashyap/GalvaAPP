/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AttendancesummaryComponent } from './attendancesummary.component';

describe('PpcComponent', () => {
  let component: AttendancesummaryComponent;
  let fixture: ComponentFixture<AttendancesummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttendancesummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
