import { TestBed } from '@angular/core/testing';

import { RejectionreviewService } from './rejectionreview.service';

describe('RejectionreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RejectionreviewService = TestBed.get(RejectionreviewService);
    expect(service).toBeTruthy();
  });
});
