import { TestBed } from '@angular/core/testing';

import { MainHubService } from './main-hub.service';

describe('MainHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainHubService = TestBed.get(MainHubService);
    expect(service).toBeTruthy();
  });
});
