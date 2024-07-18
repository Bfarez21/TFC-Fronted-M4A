import { Component, OnInit } from '@angular/core';
import { Paciente } from './paciente';
import { FichaMedica } from './ficha-medica';
import { PacienteService } from './paciente.service';
import { FichaMedicaService } from './ficha-medica.service';
@Component({
  selector: 'app-ficha-medica',
  templateUrl: './index-ficha-medica.component.html',
  styleUrl: './ficha-medica.component.css'
})
export class FichaMedicaComponent /*implements OnInit */{
  pacientes: Paciente[] = []; // Asegúrate de inicializar pacientes como un arreglo vacío


  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes(); // Llama a cargarPacientes()
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      pacientes = this.pacientes=pacientes; // Asigna los pacientes obtenidos del servicio a la propiedad del componente
    });
  }

}

