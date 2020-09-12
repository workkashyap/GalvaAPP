/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrcalComponent } from './hrcal.component';

describe('RejectionMainComponent', () => {
  let component: HrcalComponent;
  let fixture: ComponentFixture<HrcalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HrcalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrcalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
