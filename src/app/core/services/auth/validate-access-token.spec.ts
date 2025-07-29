import { TestBed } from '@angular/core/testing';

import { ValidateAccessToken } from './validate-access-token';

describe('ValidateAccessToken', () => {
  let service: ValidateAccessToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateAccessToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
