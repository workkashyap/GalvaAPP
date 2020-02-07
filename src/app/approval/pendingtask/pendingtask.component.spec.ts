/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PendingtaskComponent } from './pendingtask.component';

describe('PendingtaskComponent', () => {
  let component: PendingtaskComponent;
  let fixture: ComponentFixture<PendingtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
