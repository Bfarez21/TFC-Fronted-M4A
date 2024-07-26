import { TestBed } from '@angular/core/testing';

import { ImpresionService } from './impresion.service';

describe('ImpresionService', () => {
  let service: ImpresionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpresionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
