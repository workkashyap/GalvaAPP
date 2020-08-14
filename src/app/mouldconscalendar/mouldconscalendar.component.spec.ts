/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MouldconscalendarComponent } from './mouldconscalendar.component';

describe('SalescalendarComponent', () => {
  let component: MouldconscalendarComponent;
  let fixture: ComponentFixture<MouldconscalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MouldconscalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouldconscalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
