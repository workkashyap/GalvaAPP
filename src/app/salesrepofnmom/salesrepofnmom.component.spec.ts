import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepofnmomComponent } from './salesrepofnmom.component';

describe('SalesrepofnmomComponent', () => {
  let component: SalesrepofnmomComponent;
  let fixture: ComponentFixture<SalesrepofnmomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepofnmomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepofnmomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
