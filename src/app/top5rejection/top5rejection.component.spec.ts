import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5rejectionComponent } from './top5rejection.component';

describe('Top5rejectionComponent', () => {
  let component: Top5rejectionComponent;
  let fixture: ComponentFixture<Top5rejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top5rejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5rejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
