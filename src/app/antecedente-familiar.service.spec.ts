import { TestBed } from '@angular/core/testing';

import { AntecedenteFamiliarService } from './antecedente-familiar.service';

describe('AntecedenteFamiliarService', () => {
  let service: AntecedenteFamiliarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedenteFamiliarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
