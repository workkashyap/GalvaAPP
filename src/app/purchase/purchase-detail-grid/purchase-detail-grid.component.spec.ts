import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailGridComponent } from './purchase-detail-grid.component';

describe('PurchaseDetailGridComponent', () => {
  let component: PurchaseDetailGridComponent;
  let fixture: ComponentFixture<PurchaseDetailGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDetailGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDetailGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
