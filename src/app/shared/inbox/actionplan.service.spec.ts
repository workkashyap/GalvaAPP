/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActionplanService } from './actionplan.service';

describe('Service: Actionplan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionplanService]
    });
  });

  it('should ...', inject([ActionplanService], (service: ActionplanService) => {
    expect(service).toBeTruthy();
  }));
});
