/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApprovalcountService } from './approvalcount.service';

describe('Service: Approvalcount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovalcountService]
    });
  });

  it('should ...', inject([ApprovalcountService], (service: ApprovalcountService) => {
    expect(service).toBeTruthy();
  }));
});
