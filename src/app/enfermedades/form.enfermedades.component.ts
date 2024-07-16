import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form.enfermedades',
  templateUrl: './form.enfermedades.component.html',
  styleUrl: './form.enfermedades.component.css'
})
export class FormEnfermedadesComponent {
  constructor(private router:Router){}

  cancelar(){
    this.router.navigate(['/enfermedades'])
}
}

