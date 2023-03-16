import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectwisereportComponent } from './defectwisereport.component';

describe('DefectwisereportComponent', () => {
  let component: DefectwisereportComponent;
  let fixture: ComponentFixture<DefectwisereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectwisereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectwisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
