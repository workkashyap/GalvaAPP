/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalescalendarComponent } from './salescalendar.component';

describe('SalescalendarComponent', () => {
  let component: SalescalendarComponent;
  let fixture: ComponentFixture<SalescalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalescalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalescalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
