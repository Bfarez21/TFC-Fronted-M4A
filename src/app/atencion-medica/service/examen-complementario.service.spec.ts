import { TestBed } from '@angular/core/testing';

import { ExamenComplementarioService } from './examen-complementario.service';

describe('ExamenComplementarioService', () => {
  let service: ExamenComplementarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenComplementarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
