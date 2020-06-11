/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PpcService } from './ppc.service';

describe('Service: Ppc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PpcService]
    });
  });

  it('should ...', inject([PpcService], (service: PpcService) => {
    expect(service).toBeTruthy();
  }));
});
