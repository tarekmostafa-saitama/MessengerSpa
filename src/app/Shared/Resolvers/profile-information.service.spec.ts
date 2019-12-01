import { TestBed } from '@angular/core/testing';

import { ProfileInformationService } from './profile-information.service';

describe('ProfileInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileInformationService = TestBed.get(ProfileInformationService);
    expect(service).toBeTruthy();
  });
});
