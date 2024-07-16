import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']  
  
})
export class EnfermedadesComponent {
  constructor(private router: Router) {}

  navegarAFormulario() {
    this.router.navigate(['/form/enfermedades']);
  }
}
