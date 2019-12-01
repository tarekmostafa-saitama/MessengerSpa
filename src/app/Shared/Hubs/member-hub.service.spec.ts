import { TestBed } from '@angular/core/testing';

import { MemberHubService } from './member-hub.service';

describe('MemberHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberHubService = TestBed.get(MemberHubService);
    expect(service).toBeTruthy();
  });
});
