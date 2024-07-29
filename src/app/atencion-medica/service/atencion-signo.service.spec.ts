import { TestBed } from '@angular/core/testing';

import { AtencionSignoService } from './atencion-signo.service';

describe('AtencionSignoService', () => {
  let service: AtencionSignoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtencionSignoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
