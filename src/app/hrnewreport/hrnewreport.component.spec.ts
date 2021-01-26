import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrnewreportComponent } from './hrnewreport.component';

describe('HrnewreportComponent', () => {
  let component: HrnewreportComponent;
  let fixture: ComponentFixture<HrnewreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrnewreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrnewreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
