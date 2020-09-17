import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItmComponent } from './new-itm.component';

describe('NewJobwmComponent', () => {
  let component: NewItmComponent;
  let fixture: ComponentFixture<NewItmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewItmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
