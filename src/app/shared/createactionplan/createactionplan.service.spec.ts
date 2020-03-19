import { TestBed } from '@angular/core/testing';

import { CreateactionplanService } from './createactionplan.service';

describe('CreateactionplanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateactionplanService = TestBed.get(CreateactionplanService);
    expect(service).toBeTruthy();
  });
});
