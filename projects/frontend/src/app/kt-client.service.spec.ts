import { TestBed } from '@angular/core/testing';

import { KtClientService } from './kt-client.service';

describe('KtClientService', () => {
  let service: KtClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KtClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
