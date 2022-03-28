import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserepoComponent } from './purchaserepo.component';

describe('PurchaserepoComponent', () => {
  let component: PurchaserepoComponent;
  let fixture: ComponentFixture<PurchaserepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaserepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaserepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
