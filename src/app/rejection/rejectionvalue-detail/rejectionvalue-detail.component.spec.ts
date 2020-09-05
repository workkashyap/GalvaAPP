import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RejectionvalueDetailComponent } from "./rejectionvalue-detail.component";

describe("RejectionvalueDetailComponent", () => {
  let component: RejectionvalueDetailComponent;
  let fixture: ComponentFixture<RejectionvalueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionvalueDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionvalueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
