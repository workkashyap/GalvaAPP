import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpentaskDetailComponent } from './opentask-detail.component';

describe('OpentaskDetailComponent', () => {
  let component: OpentaskDetailComponent;
  let fixture: ComponentFixture<OpentaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpentaskDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpentaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
