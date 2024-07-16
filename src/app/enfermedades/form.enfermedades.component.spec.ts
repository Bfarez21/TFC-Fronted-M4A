import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnfermedadesComponent } from './form.enfermedades.component';

describe('FormEnfermedadesComponent', () => {
  let component: FormEnfermedadesComponent;
  let fixture: ComponentFixture<FormEnfermedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEnfermedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnfermedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
