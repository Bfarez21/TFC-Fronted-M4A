import { Component, OnInit } from "@angular/core";
import { FichaMedicaComponent } from "./ficha-medica.component";
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { FichaMedica } from "./modelo/ficha-medica";
import { DiscapacidadService } from "./servicio/discapacidad.service";
import { PacienteService } from "./servicio/paciente.service";
import { FichaMedicaService } from "./servicio/ficha-medica.service";
import { AntecedenteFamiliarService } from "./servicio/antecedente-familiar.service";
@Component({
    selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{


    // lógica para datos solo de ficha-medica
    fichaMedica: FichaMedica = new FichaMedica();
  
    constructor(
      private fichaMedicaService:FichaMedicaService,
      private discapacidadService: DiscapacidadService,
      private antecedenteFamiliarService: AntecedenteFamiliarService,
      private pacienteService: PacienteService,
      private router:Router){}

    //metodo para regresar a la vista anterior
    cancelar(){
      this.router.navigate(['/ficha-medica'])
    }

    ngOnInit(): void {
      
    }


    public create(): void {
        // Primero, crea el paciente
        this.pacienteService.create(this.fichaMedica.paciente).subscribe(paciente => {
            // Luego, crea la discapacidad
            this.discapacidadService.create(this.fichaMedica.discapacidad).subscribe(discapacidad => {
                // Después, crea el antecedente familiar
                this.antecedenteFamiliarService.create(this.fichaMedica.antecedenteFamiliar).subscribe(antecedente => {
    
                    // Asigna los IDs a la ficha médica/antecedenteFamiliar
                    this.fichaMedica.paciente = paciente; // Asegúrate de asignar el ID, no el objeto
                    console.log(this,this.fichaMedica)
                    this.fichaMedica.discapacidad = discapacidad; // Asegúrate de asignar el ID, no el objeto
                    console.log(this.fichaMedica.discapacidad)
                    this.fichaMedica.antecedenteFamiliar = antecedente; // Asegúrate de asignar el ID, no el objeto
                    console.log(this,this.fichaMedica.antecedenteFamiliar)
    
                    // Finalmente, crea la ficha médica
                    this.fichaMedicaService.create(this.fichaMedica).subscribe(fichaMedica => {
                        Swal.fire('Ficha médica guardada', `Ficha médica del paciente ${this.fichaMedica.paciente.nombrePac} guardada con éxito`, 'success');
                        this.router.navigate(['/ficha-medica']);
                    }, error => {
                        Swal.fire('Error', 'Hubo un problema al guardar la ficha médica', 'error');
                    });
                }, error => {
                    Swal.fire('Error', 'Hubo un problema al guardar el antecedente familiar', 'error');
                });
            }, error => {
                Swal.fire('Error', 'Hubo un problema al guardar la discapacidad', 'error');
            });
        }, error => {
            Swal.fire('Error', 'Hubo un problema al guardar el paciente', 'error');
        });
    }
    
}