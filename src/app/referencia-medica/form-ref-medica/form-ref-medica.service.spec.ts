import { TestBed } from '@angular/core/testing';

import { FormRefMedicaService } from './form-ref-medica.service';

describe('FormRefMedicaService', () => {
  let service: FormRefMedicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormRefMedicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
