import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  patients = [
    { nombre: 'Juan', cedula: '0106104971', razon: 'Gripe leve', edad: 22, carrera: 'Desarrollo de Software', fechaVisita: '21-03-2022', receta: 'Paracetamol al fallo' },
    { nombre: 'Pedro', cedula: '0104597064', razon: 'Dolor de cabeza', edad: 31, carrera: 'Ingeniería Civil', fechaVisita: '10-07-2024', receta: 'Paracetamol' },
  ];

  viewPatient(patient: any) {
    alert('Viewing patient: ' + patient.nombre);
  }

  editPatient(patient: any) {
    alert('Editing patient: ' + patient.nombre);
  }

  deletePatient(patient: any) {
    alert('Deleting patient: ' + patient.nombre);
  }
}
