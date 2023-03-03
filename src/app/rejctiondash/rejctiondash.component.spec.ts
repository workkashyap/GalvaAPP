import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejctiondashComponent } from './rejctiondash.component';

describe('RejctiondashComponent', () => {
  let component: RejctiondashComponent;
  let fixture: ComponentFixture<RejctiondashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejctiondashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejctiondashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
