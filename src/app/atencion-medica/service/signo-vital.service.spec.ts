import { TestBed } from '@angular/core/testing';

import { SignoVitalService } from './signo-vital.service';

describe('SignoVitalService', () => {
  let service: SignoVitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignoVitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
