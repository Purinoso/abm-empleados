import { TestBed } from '@angular/core/testing';

import SnackBarMessageService from './snack-bar-message.service';

describe('SnackBarMessageService', () => {
  let service: SnackBarMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
