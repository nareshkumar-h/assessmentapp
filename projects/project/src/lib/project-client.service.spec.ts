import { TestBed } from '@angular/core/testing';

import { ProjectClientService } from './project-client.service';

describe('ProjectClientService', () => {
  let service: ProjectClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
