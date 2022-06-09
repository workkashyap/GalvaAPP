import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaputilsworkerupdateComponent } from './caputilsworkerupdate.component';

describe('CaputilsworkerupdateComponent', () => {
  let component: CaputilsworkerupdateComponent;
  let fixture: ComponentFixture<CaputilsworkerupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaputilsworkerupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaputilsworkerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
