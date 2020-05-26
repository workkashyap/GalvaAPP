/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PurchasecalendarComponent } from './purchasecalendar.component';

describe('SalescalendarComponent', () => {
  let component: PurchasecalendarComponent;
  let fixture: ComponentFixture<PurchasecalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasecalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasecalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
