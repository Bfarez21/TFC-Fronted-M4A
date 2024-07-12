import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaMedicaComponent } from './referencia-medica.component';

describe('ReferenciaMedicaComponent', () => {
  let component: ReferenciaMedicaComponent;
  let fixture: ComponentFixture<ReferenciaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferenciaMedicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenciaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
