import { TestBed } from '@angular/core/testing';

import { ChangePasswordService } from './change-password';

describe('ChangePassword', () => {
  let service: ChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
