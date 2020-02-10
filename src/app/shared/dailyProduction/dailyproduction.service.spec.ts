import { TestBed } from "@angular/core/testing";

import { DailyproductionService } from "./dailyproduction.service";

describe("ailyproductionService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DailyproductionService = TestBed.get(DailyproductionService);
    expect(service).toBeTruthy();
  });
});
