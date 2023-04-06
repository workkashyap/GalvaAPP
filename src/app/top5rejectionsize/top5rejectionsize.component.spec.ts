import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5rejectionsizeComponent } from './top5rejectionsize.component';

describe('Top5rejectionsizeComponent', () => {
  let component: Top5rejectionsizeComponent;
  let fixture: ComponentFixture<Top5rejectionsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top5rejectionsizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5rejectionsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
