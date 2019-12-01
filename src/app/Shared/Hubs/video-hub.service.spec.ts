import { TestBed } from '@angular/core/testing';

import { VideoHubService } from './video-hub.service';

describe('VideoHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoHubService = TestBed.get(VideoHubService);
    expect(service).toBeTruthy();
  });
});
