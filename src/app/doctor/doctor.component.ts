import { Component, OnInit } from '@angular/core';
import { Doctor } from './doctor';
import { DoctorService } from './doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  doctores: Doctor[] = []; // Asegúrate de inicializar como un arreglo vacío

  cedulaBusqueda: string = '';
  doctorEncontrado: Doctor | null = null;

  constructor(private doctorService:DoctorService){}

  ngOnInit(): void {
    this.cargarDoctores(); // Llama a cargarDoctores()
  }
  // metodo carga los datos en la tabla
  cargarDoctores(): void {
    this.doctorService.getDoctores().subscribe(doctores => {
      doctores = this.doctores=doctores; // Asigna los doctores obtenidos del servicio a la propiedad del componente
    });
  }

  /// BOTON ELIMINAR
  //eliminar datos de la base
  deleteDoctor(id:number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(id).subscribe(response => {
          this.doctores=this.doctores.filter(Doctor=>Doctor.idDoctor !==id);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success'
          });
        });
      }
    });
  }
      /// BOTON VER
  // uso Sweetalert para mostrar datos de un registro y asigno en el boton ver
  verDetalles(doctor: Doctor): void {
    Swal.fire({
      title: `${doctor.nombreDoc} ${doctor.apellidoDoc}`,
      html: `
        <p><strong>Cédula:</strong> ${doctor.cedulaDoc}</p>
        <p><strong>Teléfono:</strong> ${doctor.telefonoDoc}</p>
        <p><strong>Dirección:</strong> ${doctor.direccionDoc}</p>
        <p><strong>Especialidad:</strong> ${doctor.especialidadDoc}</p>
        <p><strong>Código MSP:</strong> ${doctor.codigoMspDoc}</p>
        <p><strong>Género:</strong> ${doctor.generoDoc}</p>
      `,
    });
  }

  // BOTON BUSCAR 
  buscar(): void {
    if (this.cedulaBusqueda) {
      this.doctorService.buscarPorCedula(this.cedulaBusqueda).subscribe(
        doctor => {
          this.doctorEncontrado = doctor;
        },
        error => {
          console.error('Error al buscar el doctor:', error);
          this.doctorEncontrado = null;
        }
      );
    }
  }

  // BOTÓN ACTUALIZAR TABLA
  refrescar(): void {
    this.cargarDoctores(); // Llama a cargarDoctores para recargar registros
    this.cedulaBusqueda = ''; // Limpia el campo 
    this.doctorEncontrado = null; // Reinicia la variable del doctor encontrado
  }

}
