import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroundhourComponent } from './addroundhour.component';

describe('NewJobwmComponent', () => {
  let component: AddroundhourComponent;
  let fixture: ComponentFixture<AddroundhourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddroundhourComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroundhourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
