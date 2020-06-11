/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PpccalendarComponent } from './ppccalendar.component';

describe('SalescalendarComponent', () => {
  let component: PpccalendarComponent;
  let fixture: ComponentFixture<PpccalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PpccalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpccalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
