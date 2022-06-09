import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaputilsworkerComponent } from './caputilsworker.component';

describe('CaputilsworkerComponent', () => {
  let component: CaputilsworkerComponent;
  let fixture: ComponentFixture<CaputilsworkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaputilsworkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaputilsworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
