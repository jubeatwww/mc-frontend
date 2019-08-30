import { TestBed } from '@angular/core/testing';

import { DatasetVisService } from './dataset-vis.service';

describe('DatasetVisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasetVisService = TestBed.get(DatasetVisService);
    expect(service).toBeTruthy();
  });
});
