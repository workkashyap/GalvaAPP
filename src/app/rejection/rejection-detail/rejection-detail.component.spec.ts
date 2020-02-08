import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RejectionDetailComponent } from "./rejection-detail.component";

describe("RejectionDetailComponent", () => {
  let component: RejectionDetailComponent;
  let fixture: ComponentFixture<RejectionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
