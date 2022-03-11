import { TestBed } from '@angular/core/testing';

import { SalesrepoService } from './salesrepo.service';

describe('SalesrepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesrepoService = TestBed.get(SalesrepoService);
    expect(service).toBeTruthy();
  });
});
