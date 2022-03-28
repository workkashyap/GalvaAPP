import { TestBed } from '@angular/core/testing';

import { ProductionrepoService } from './purchaserepo.service';

describe('ProductionrepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductionrepoService = TestBed.get(ProductionrepoService);
    expect(service).toBeTruthy();
  });
});
