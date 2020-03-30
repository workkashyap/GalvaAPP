import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateactionplanComponent } from './createactionplan.component';

describe('CreateactionplanComponent', () => {
  let component: CreateactionplanComponent;
  let fixture: ComponentFixture<CreateactionplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateactionplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateactionplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
