import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaputilsviewComponent } from './caputilsview.component';

describe('CaputilsviewComponent', () => {
  let component: CaputilsviewComponent;
  let fixture: ComponentFixture<CaputilsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaputilsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaputilsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
