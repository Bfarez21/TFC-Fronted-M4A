import { Component, OnInit } from "@angular/core";
import { FichaMedicaComponent } from "./ficha-medica.component";
import { Router } from '@angular/router';
import { Paciente } from "./paciente";
import { PacienteService } from "./paciente.service";
import Swal from "sweetalert2";
import { FichaMedica } from "./ficha-medica";
import { FichaMedicaService } from "./ficha-medica.service";
@Component({
    selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

    public paciente:Paciente = new Paciente()

    // lógica para datos solo de ficha-medica
  fichaMedica: FichaMedica = new FichaMedica();
  discapacidad = {
    fisica: false,
    intelectual: false
  };
  antecedentes: string[] = [];
  
    constructor(private pacienteService:PacienteService,private router:Router){}

    //metodo para regresar a la vista anterior
    cancelar(){
      this.router.navigate(['/ficha-medica'])
    }

    ngOnInit(): void {
      
    }
    public create():void{
      this.pacienteService.create(this.paciente)
      .subscribe(
         paciente=> {this.router.navigate(['/ficha-medica'])
         Swal.fire('Paciente guardado',  `Paciente ${this.paciente.nombre_pac} guardado con exito`,'success')
         }
        )
    }

      
}