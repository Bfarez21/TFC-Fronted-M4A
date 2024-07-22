import { TestBed } from '@angular/core/testing';

import { DiscapacidadService } from './discapacidad.service';

describe('DiscapacidadService', () => {
  let service: DiscapacidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscapacidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
