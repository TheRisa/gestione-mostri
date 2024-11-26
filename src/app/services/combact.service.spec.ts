import { TestBed } from '@angular/core/testing';

import { CombactService } from './combact.service';

describe('CombactService', () => {
  let service: CombactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
