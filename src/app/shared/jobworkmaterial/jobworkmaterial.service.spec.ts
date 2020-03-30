import { TestBed } from "@angular/core/testing";

import { JobworkmaterialService } from "./jobworkmaterial.service";

describe("JobworkmaterialService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: JobworkmaterialService = TestBed.get(JobworkmaterialService);
    expect(service).toBeTruthy();
  });
});
