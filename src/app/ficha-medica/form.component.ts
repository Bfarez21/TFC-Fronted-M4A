import { Component } from "@angular/core";
import { FichaMedicaComponent } from "./ficha-medica.component";
import { Router } from '@angular/router';
@Component({
    selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent{

    constructor(private router:Router){}
    //metodo para regresar a la vista anterior
    cancelar(){
      this.router.navigate(['/ficha-medica'])
    }
}