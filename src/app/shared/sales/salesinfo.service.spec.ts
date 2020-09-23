import { TestBed } from '@angular/core/testing';

import { SalesinfoService } from './salesinfo.service';

describe('SalesinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesinfoService = TestBed.get(SalesinfoService);
    expect(service).toBeTruthy();
  });
});
