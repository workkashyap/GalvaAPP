import { TestBed } from '@angular/core/testing';

import { MouldconscalendarService } from './mouldconscalendar.service';

describe('PurchaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MouldconscalendarService = TestBed.get(MouldconscalendarService);
    expect(service).toBeTruthy();
  });
});
