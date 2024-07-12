import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMedicaComponent } from './ficha-medica.component';

describe('FichaMedicaComponent', () => {
  let component: FichaMedicaComponent;
  let fixture: ComponentFixture<FichaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaMedicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
