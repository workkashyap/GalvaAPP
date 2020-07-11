import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpcdetailComponent } from './ppcdetail.component';

describe('PurchaseComponent', () => {
  let component: PpcdetailComponent;
  let fixture: ComponentFixture<PpcdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpcdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpcdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
