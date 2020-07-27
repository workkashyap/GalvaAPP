/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrcalendarComponent } from './hrcalendar.component';

describe('PpcComponent', () => {
  let component: HrcalendarComponent;
  let fixture: ComponentFixture<HrcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HrcalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
