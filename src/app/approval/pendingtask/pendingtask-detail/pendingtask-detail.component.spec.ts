/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { PendingtaskdetailComponent } from "./pendingtask-detail.component";

describe("PendingtaskDetailComponent", () => {
  let component: PendingtaskdetailComponent;
  let fixture: ComponentFixture<PendingtaskdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PendingtaskdetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingtaskdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
