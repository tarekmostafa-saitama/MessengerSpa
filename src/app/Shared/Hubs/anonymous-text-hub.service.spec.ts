import { TestBed } from '@angular/core/testing';

import { AnonymousTextHubService } from './anonymous-text-hub.service';

describe('AnonymousTextHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnonymousTextHubService = TestBed.get(AnonymousTextHubService);
    expect(service).toBeTruthy();
  });
});
