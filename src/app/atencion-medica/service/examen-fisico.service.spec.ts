import { TestBed } from '@angular/core/testing';

import { ExamenFisicoService } from './examen-fisico.service';

describe('ExamenFisicoService', () => {
  let service: ExamenFisicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenFisicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
