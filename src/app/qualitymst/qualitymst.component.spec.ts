import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitymstComponent } from './qualitymst.component';

describe('QualitymstComponent', () => {
  let component: QualitymstComponent;
  let fixture: ComponentFixture<QualitymstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitymstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitymstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
