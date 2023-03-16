import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitySummaryComponent } from './quality-summary.component';

describe('QualitySummaryComponent', () => {
  let component: QualitySummaryComponent;
  let fixture: ComponentFixture<QualitySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
