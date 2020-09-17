import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmstsComponent } from './itemmsts.component';

describe('JobworkmaterialComponent', () => {
  let component: ItemmstsComponent;
  let fixture: ComponentFixture<ItemmstsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemmstsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemmstsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
