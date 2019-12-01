import { TestBed, async, inject } from '@angular/core/testing';

import { CheckFriendExistenceGuard } from './check-friend-existence.guard';

describe('CheckFriendExistenceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFriendExistenceGuard]
    });
  });

  it('should ...', inject([CheckFriendExistenceGuard], (guard: CheckFriendExistenceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
