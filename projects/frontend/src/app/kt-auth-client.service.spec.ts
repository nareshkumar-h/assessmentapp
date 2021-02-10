import { TestBed } from '@angular/core/testing';

import { KtAuthClientService } from './kt-auth-client.service';

describe('KtAuthClientService', () => {
  let service: KtAuthClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KtAuthClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
