import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referencia-medica',
  templateUrl: './referencia-medica.component.html',
  styleUrl: './referencia-medica.component.css'
})
export class ReferenciaMedicaComponent {
  constructor(private router: Router) {}

  navegarAFormulario() {
    this.router.navigate(['/form-ref-medica']);
  }
}
