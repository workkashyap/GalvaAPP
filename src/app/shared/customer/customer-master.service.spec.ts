import { TestBed } from '@angular/core/testing';

import { CustomerMasterService } from './customer-master.service';

describe('CustomerMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerMasterService = TestBed.get(CustomerMasterService);
    expect(service).toBeTruthy();
  });
});
