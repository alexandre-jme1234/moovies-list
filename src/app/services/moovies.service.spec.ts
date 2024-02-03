import { TestBed } from '@angular/core/testing';

import { MooviesService } from './moovies.service';

describe('MooviesService', () => {
  let service: MooviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MooviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
