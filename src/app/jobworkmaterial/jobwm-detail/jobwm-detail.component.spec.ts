import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobwmDetailComponent } from './jobwm-detail.component';

describe('JobwmDetailComponent', () => {
  let component: JobwmDetailComponent;
  let fixture: ComponentFixture<JobwmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobwmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobwmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
