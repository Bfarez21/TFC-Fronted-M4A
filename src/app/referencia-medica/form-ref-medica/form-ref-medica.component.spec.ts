import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRefMedicaComponent } from './form-ref-medica.component';

describe('FormRefMedicaComponent', () => {
  let component: FormRefMedicaComponent;
  let fixture: ComponentFixture<FormRefMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRefMedicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRefMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
