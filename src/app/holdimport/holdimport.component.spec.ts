import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldimportComponent } from './holdimport.component';

describe('HoldimportComponent', () => {
  let component: HoldimportComponent;
  let fixture: ComponentFixture<HoldimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
