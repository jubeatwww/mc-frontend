import { TestBed } from '@angular/core/testing';

import { DatasetEntryService } from './dataset-entry.service';

describe('DatasetEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasetEntryService = TestBed.get(DatasetEntryService);
    expect(service).toBeTruthy();
  });
});
