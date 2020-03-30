import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobwmComponent } from './new-jobwm.component';

describe('NewJobwmComponent', () => {
  let component: NewJobwmComponent;
  let fixture: ComponentFixture<NewJobwmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJobwmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJobwmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
