import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-atencion-medica',
  templateUrl: './form-atencion-medica.component.html',
  styleUrl: './form-atencion-medica.component.css'
})
export class FormAtencionMedicaComponent implements OnInit{

  constructor(private router:Router){}

  // metodo regresar ventana anterior
  cancelar(){
    this.router.navigate(['/atencion-medica'])
}

  ngOnInit(): void {
    
  }

}
