import { TestBed } from "@angular/core/testing";

import { ProductionsService } from "./productions.service";

describe("JobworkmaterialService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ProductionsService = TestBed.get(ProductionsService);
    expect(service).toBeTruthy();
  });
});
