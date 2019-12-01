import { TestBed } from '@angular/core/testing';

import { AdminHubService } from './admin-hub.service';

describe('AdminHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminHubService = TestBed.get(AdminHubService);
    expect(service).toBeTruthy();
  });
});
