import { TestBed } from '@angular/core/testing';

import { RoundhoursService } from './roundhours.service';

describe('CreateactionplanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoundhoursService = TestBed.get(RoundhoursService);
    expect(service).toBeTruthy();
  });
});
