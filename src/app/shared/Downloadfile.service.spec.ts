/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DownloadfileService } from './Downloadfile.service';

describe('Service: Downloadfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadfileService]
    });
  });

  it('should ...', inject([DownloadfileService], (service: DownloadfileService) => {
    expect(service).toBeTruthy();
  }));
});
