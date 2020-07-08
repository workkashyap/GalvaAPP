import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CompanytouserComponent } from "../compannytouser/companytouser.component";

describe("RejectionComponent", () => {
  let component: CompanytouserComponent;
  let fixture: ComponentFixture<CompanytouserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanytouserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanytouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
