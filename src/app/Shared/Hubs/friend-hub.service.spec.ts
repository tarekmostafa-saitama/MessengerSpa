import { TestBed } from '@angular/core/testing';

import { FriendHubService } from './friend-hub.service';

describe('FriendHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendHubService = TestBed.get(FriendHubService);
    expect(service).toBeTruthy();
  });
});
