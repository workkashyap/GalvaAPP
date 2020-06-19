import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RoletouserComponent } from "../roletouser/roletouser.component";

describe("RejectionComponent", () => {
  let component: RoletouserComponent;
  let fixture: ComponentFixture<RoletouserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoletouserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoletouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
