import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobworkmaterialComponent } from './jobworkmaterial.component';

describe('JobworkmaterialComponent', () => {
  let component: JobworkmaterialComponent;
  let fixture: ComponentFixture<JobworkmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobworkmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobworkmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
