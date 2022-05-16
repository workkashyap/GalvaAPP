import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaputilsComponent } from './caputils.component';

describe('CaputilsComponent', () => {
  let component: CaputilsComponent;
  let fixture: ComponentFixture<CaputilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaputilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaputilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
