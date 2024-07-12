import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionMedicaComponent } from './atencion-medica.component';

describe('AtencionMedicaComponent', () => {
  let component: AtencionMedicaComponent;
  let fixture: ComponentFixture<AtencionMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtencionMedicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
