import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditviewComponent } from './auditview.component';

describe('AuditviewComponent', () => {
  let component: AuditviewComponent;
  let fixture: ComponentFixture<AuditviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
