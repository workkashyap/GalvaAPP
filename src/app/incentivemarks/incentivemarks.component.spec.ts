/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncentivemarksComponent } from './incentivemarks.component';

describe('IncentivemarksComponent', () => {
  let component: IncentivemarksComponent;
  let fixture: ComponentFixture<IncentivemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentivemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentivemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
