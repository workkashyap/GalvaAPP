import { TestBed } from '@angular/core/testing';

import { HoldnbuffService } from './holdnbuff.service';

describe('HoldnbuffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoldnbuffService = TestBed.get(HoldnbuffService);
    expect(service).toBeTruthy();
  });
});
