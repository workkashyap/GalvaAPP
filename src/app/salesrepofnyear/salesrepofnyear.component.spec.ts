import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepofnyearComponent } from './salesrepofnyear.component';

describe('SalesrepofnyearComponent', () => {
  let component: SalesrepofnyearComponent;
  let fixture: ComponentFixture<SalesrepofnyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepofnyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepofnyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
