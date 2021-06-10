import { TestBed } from '@angular/core/testing';

import { LoadingreService } from './loadingre.service';

describe('LoadingreService', () => {
  let service: LoadingreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
