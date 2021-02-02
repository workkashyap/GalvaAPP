import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrbillsComponent } from './hrbills.component';

describe('HrbillsComponent', () => {
  let component: HrbillsComponent;
  let fixture: ComponentFixture<HrbillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrbillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
