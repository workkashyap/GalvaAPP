import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RoletopagesComponent } from "../roletopages/roletopages.component";

describe("RejectionComponent", () => {
  let component: RoletopagesComponent;
  let fixture: ComponentFixture<RoletopagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoletopagesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoletopagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
