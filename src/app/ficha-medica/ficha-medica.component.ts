import { Component, OnInit } from '@angular/core';
import { PacienteService } from './servicio/paciente.service';
import { FichaMedicaService } from './servicio/ficha-medica.service';
import { Paciente } from './modelo/paciente';
import { FichaMedica } from './modelo/ficha-medica';
@Component({
  selector: 'app-ficha-medica',
  templateUrl: './index-ficha-medica.component.html',
  styleUrl: './ficha-medica.component.css'
})
export class FichaMedicaComponent /*implements OnInit */{
  fichaMedica:FichaMedica[] = []; // Asegúrate de inicializar pacientes como un arreglo vacío
  cedulaBusqueda: string = '';
  fichaEncontrado: FichaMedica | null = null;

  constructor(private fichaMedicaService: FichaMedicaService) {}

  ngOnInit(): void {
    this.cargarFichaMedica(); // Llama a cargarPacientes()
  }

  cargarFichaMedica(): void {
    this.fichaMedicaService.getFichasMedicas().subscribe(fichaMedica => {
      fichaMedica = this.fichaMedica=fichaMedica; // Asigna los pacientes obtenidos del servicio a la propiedad del componente
    });
  }

}

