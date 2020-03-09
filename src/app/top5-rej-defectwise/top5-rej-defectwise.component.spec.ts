import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5RejDefectwiseComponent } from './top5-rej-defectwise.component';

describe('Top5RejDefectwiseComponent', () => {
  let component: Top5RejDefectwiseComponent;
  let fixture: ComponentFixture<Top5RejDefectwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top5RejDefectwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5RejDefectwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
