import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RolepagesComponent } from "./rolepages.component";

describe("RejectionComponent", () => {
  let component: RolepagesComponent;
  let fixture: ComponentFixture<RolepagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolepagesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolepagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
