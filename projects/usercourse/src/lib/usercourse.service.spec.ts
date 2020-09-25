import { TestBed } from '@angular/core/testing';

import { UsercourseService } from './usercourse.service';

describe('UsercourseService', () => {
  let service: UsercourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
