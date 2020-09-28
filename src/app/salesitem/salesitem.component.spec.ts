import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SalesitemComponent } from "./salesitem.component";

describe("SalesitemComponent", () => {
  let component: SalesitemComponent;
  let fixture: ComponentFixture<SalesitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesitemComponent]
    }).compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(SalesitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
