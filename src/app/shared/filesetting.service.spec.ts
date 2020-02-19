/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilesettingService } from './filesetting.service';

describe('Service: Filesetting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesettingService]
    });
  });

  it('should ...', inject([FilesettingService], (service: FilesettingService) => {
    expect(service).toBeTruthy();
  }));
});
