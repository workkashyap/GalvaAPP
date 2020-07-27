/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttendancesummaryService } from './attendancesummary.service';

describe('Service: Ppc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttendancesummaryService]
    });
  });

  it('should ...', inject([AttendancesummaryService], (service: AttendancesummaryService) => {
    expect(service).toBeTruthy();
  }));
});
