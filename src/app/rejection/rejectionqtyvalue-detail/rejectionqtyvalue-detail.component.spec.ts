import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RejectionqtyvalueDetailComponent } from "./rejectionqtyvalue-detail.component";

describe("RejectionDetailComponent", () => {
  let component: RejectionqtyvalueDetailComponent;
  let fixture: ComponentFixture<RejectionqtyvalueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionqtyvalueDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionqtyvalueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
