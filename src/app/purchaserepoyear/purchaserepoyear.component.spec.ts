import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserepoyearComponent } from './purchaserepoyear.component';

describe('PurchaserepoyearComponent', () => {
  let component: PurchaserepoyearComponent;
  let fixture: ComponentFixture<PurchaserepoyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaserepoyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaserepoyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
