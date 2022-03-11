import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepoComponent } from './salesrepo.component';

describe('SalesrepoComponent', () => {
  let component: SalesrepoComponent;
  let fixture: ComponentFixture<SalesrepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
