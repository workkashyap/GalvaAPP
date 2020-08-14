import { TestBed } from '@angular/core/testing';

import { MouldproductionService } from './mouldproduction.service';

describe('PurchaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MouldproductionService = TestBed.get(MouldproductionService);
    expect(service).toBeTruthy();
  });
});
