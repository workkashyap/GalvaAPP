import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionreviewviewComponent } from './rejectionreviewview.component';

describe('RejectionreviewviewComponent', () => {
  let component: RejectionreviewviewComponent;
  let fixture: ComponentFixture<RejectionreviewviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionreviewviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionreviewviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
