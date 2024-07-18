import { Component, OnInit } from '@angular/core';
import { Doctor } from './doctor';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  doctores: Doctor[] = []; // Asegúrate de inicializar como un arreglo vacío

  constructor(private doctorService:DoctorService){}

  ngOnInit(): void {
    this.cargarDoctores(); // Llama a cargarDoctores()
  }

  cargarDoctores(): void {
    this.doctorService.getDoctores().subscribe(doctores => {
      doctores = this.doctores=doctores; // Asigna los doctores obtenidos del servicio a la propiedad del componente
    });
  }
}
