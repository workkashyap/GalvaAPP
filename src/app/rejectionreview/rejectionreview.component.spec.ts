import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionreviewComponent } from './rejectionreview.component';

describe('RejectionreviewComponent', () => {
  let component: RejectionreviewComponent;
  let fixture: ComponentFixture<RejectionreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
