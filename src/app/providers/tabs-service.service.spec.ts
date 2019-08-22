import { TestBed } from '@angular/core/testing';

import { TabsServiceService } from './tabs-service.service';

describe('TabsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabsServiceService = TestBed.get(TabsServiceService);
    expect(service).toBeTruthy();
  });
});
