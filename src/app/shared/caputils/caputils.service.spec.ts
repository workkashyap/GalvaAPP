import { TestBed } from '@angular/core/testing';

import { CaputilsService } from './caputils.service';

describe('CaputilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaputilsService = TestBed.get(CaputilsService);
    expect(service).toBeTruthy();
  });
});
