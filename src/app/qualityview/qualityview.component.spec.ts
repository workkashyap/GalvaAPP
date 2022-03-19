import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityviewComponent } from './qualityview.component';

describe('QualityviewComponent', () => {
  let component: QualityviewComponent;
  let fixture: ComponentFixture<QualityviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
