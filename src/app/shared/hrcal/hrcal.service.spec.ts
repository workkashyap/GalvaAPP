/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HrcalService } from './hrcal.service';

describe('Service: Ppc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrcalService]
    });
  });

  it('should ...', inject([HrcalService], (service: HrcalService) => {
    expect(service).toBeTruthy();
  }));
});
