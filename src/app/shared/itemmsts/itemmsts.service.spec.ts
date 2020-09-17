import { TestBed } from "@angular/core/testing";

import { ItemmstsService } from "./itemmsts.service";

describe("itemmsts", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ItemmstsService = TestBed.get(ItemmstsService);
    expect(service).toBeTruthy();
  });
});
