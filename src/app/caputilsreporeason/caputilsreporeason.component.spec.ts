import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaputilsreporeasonComponent } from './caputilsreporeason.component';

describe('CaputilsreporeasonComponent', () => {
  let component: CaputilsreporeasonComponent;
  let fixture: ComponentFixture<CaputilsreporeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaputilsreporeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaputilsreporeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
