import { TestBed } from '@angular/core/testing';

import { RefreshToken } from './refresh-token';

describe('RefreshToken', () => {
  let service: RefreshToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
