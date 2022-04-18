import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcalendarmldgComponent } from './qcalendarmldg.component';

describe('QcalendarmldgComponent', () => {
  let component: QcalendarmldgComponent;
  let fixture: ComponentFixture<QcalendarmldgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcalendarmldgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcalendarmldgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
