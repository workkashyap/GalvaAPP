/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OpentaskComponent } from './opentask.component';

describe('OpentaskComponent', () => {
  let component: OpentaskComponent;
  let fixture: ComponentFixture<OpentaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpentaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpentaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
