import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaputilsreportComponent } from './caputilsreport.component';

describe('CaputilsreportComponent', () => {
  let component: CaputilsreportComponent;
  let fixture: ComponentFixture<CaputilsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaputilsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaputilsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
