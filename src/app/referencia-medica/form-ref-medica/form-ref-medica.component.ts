import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-ref-medica',
  templateUrl: './form-ref-medica.component.html',
  styleUrl: './form-ref-medica.component.css'
})
export class FormRefMedicaComponent {
  constructor(private router:Router){}
  //metodo para regresar a la vista anterior
  cancelar(){
    this.router.navigate(['/referencia-medica'])
  }
}
