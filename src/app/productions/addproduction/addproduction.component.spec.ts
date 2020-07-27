import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductionComponent } from './addproduction.component';

describe('NewJobwmComponent', () => {
  let component: AddproductionComponent;
  let fixture: ComponentFixture<AddproductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
