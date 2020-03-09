import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolnbuffComponent } from './holnbuff.component';

describe('HolnbuffComponent', () => {
  let component: HolnbuffComponent;
  let fixture: ComponentFixture<HolnbuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolnbuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolnbuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
