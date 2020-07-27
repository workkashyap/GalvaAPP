/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrcalendarService } from './hrcalendar.service';

describe('Service: Ppc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrcalendarService]
    });
  });

  it('should ...', inject([HrcalendarService], (service: HrcalendarService) => {
    expect(service).toBeTruthy();
  }));
});
