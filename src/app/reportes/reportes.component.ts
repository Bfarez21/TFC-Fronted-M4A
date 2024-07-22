import { Component } from '@angular/core';
import { PacienteService } from '../ficha-medica/paciente.service';
import { Paciente } from './paciente';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  patients: Paciente[] = [];

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.viewPatient(); // Llama a cargarPacientes()
  }

  viewPatient(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      // pacientes = this.patients=pacientes; // Asigna los pacientes obtenidos del servicio a la propiedad del componente
    });
  }

  /*patients = [
    { nombre: 'Juan', cedula: '0106104971', razon: 'Gripe leve', edad: 22, carrera: 'Desarrollo de Software', fechaVisita: '21-03-2022', receta: 'Paracetamol al fallo' },
    { nombre: 'Pedro', cedula: '0104597064', razon: 'Dolor de cabeza', edad: 31, carrera: 'Ingeniería Civil', fechaVisita: '10-07-2024', receta: 'Paracetamol' },
  ]; */

  /*viewPatient(patient: any) {
    alert('Viewing patient: ' + patient.nombre);
  }*/


}
