import { TestBed } from '@angular/core/testing';

import { HrbillsService } from './hrbills.service';

describe('HrbillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrbillsService = TestBed.get(HrbillsService);
    expect(service).toBeTruthy();
  });
});
