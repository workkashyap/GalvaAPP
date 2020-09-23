import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SalesinfoComponent } from "./salesinfo.component";

describe("SalesDetailComponent", () => {
  let component: SalesinfoComponent;
  let fixture: ComponentFixture<SalesinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesinfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
