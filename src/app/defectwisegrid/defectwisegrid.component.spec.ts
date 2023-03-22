import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectwisegridComponent } from './defectwisegrid.component';

describe('DefectwisegridComponent', () => {
  let component: DefectwisegridComponent;
  let fixture: ComponentFixture<DefectwisegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectwisegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectwisegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
