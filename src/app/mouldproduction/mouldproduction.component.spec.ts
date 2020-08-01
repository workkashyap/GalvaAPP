/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MouldproductionComponent } from './mouldproduction.component';

describe('SalescalendarComponent', () => {
  let component: MouldproductionComponent;
  let fixture: ComponentFixture<MouldproductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MouldproductionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouldproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
