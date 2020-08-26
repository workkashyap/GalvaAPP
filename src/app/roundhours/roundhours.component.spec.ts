import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundhoursComponent } from './roundhours.component';

describe('CreateactionplanComponent', () => {
  let component: RoundhoursComponent;
  let fixture: ComponentFixture<RoundhoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundhoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
