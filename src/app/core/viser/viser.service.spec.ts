import { TestBed } from '@angular/core/testing';

import { ViserService } from './viser.service';

describe('ViserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViserService = TestBed.get(ViserService);
    expect(service).toBeTruthy();
  });
});
