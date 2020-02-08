import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTaskDetailComponent } from './completed-task-detail.component';

describe('CompletedTaskDetailComponent', () => {
  let component: CompletedTaskDetailComponent;
  let fixture: ComponentFixture<CompletedTaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedTaskDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
