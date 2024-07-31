import { Component } from '@angular/core';
import { AtencionMedica } from './modelo/atencion-medica';
import { AtencionMedicaService } from './service/atencion-medica.service';
import { FichaMedicaService } from '../ficha-medica/servicio/ficha-medica.service';
import { PacienteService } from '../reportes/paciente.service';
import { Paciente } from '../ficha-medica/modelo/paciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atencion-medica',
  templateUrl: `./index-atencion-medica.component.html`,
  styleUrl: './atencion-medica.component.css'
})
export class AtencionMedicaComponent {
  atencionesMedicas: AtencionMedica[] = []; // Asegúrate de inicializar como un arreglo vacío

  cedulaBusqueda: string = '';
  atencionMedicaEncontrado: AtencionMedica | null = null;
  pacienteEncontrado: Paciente | null = null;
  AtencioMedicaEncontrado: AtencionMedica | null = null;


  constructor(
    private atencionMedicaService:AtencionMedicaService
    
  ){}

  ngOnInit(): void {
    this.cargarAtencionesMedicas(); 
  }
  // metodo carga los datos en la tabla
  cargarAtencionesMedicas(): void {
    this.atencionMedicaService.getAtencionesMedicas().subscribe(atencionesMedicas => {
      atencionesMedicas = this.atencionesMedicas = atencionesMedicas; 
      
    });
  }

  
  

  /// BOTON ELIMINAR
  //eliminar datos de la base
  /*deleteDoctor(id:number):void{
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
  }*/
  verDetalles(atencionMedica: AtencionMedica): void {
    Swal.fire({
      title: `Paciente ${atencionMedica.fichaMedica.paciente.nombrePac} ${atencionMedica.fichaMedica.paciente.apellidoPac}`,
      html: `
        <p><strong>Cédula:</strong> ${atencionMedica.fichaMedica.paciente.cedulaPac}</p>
        <p><strong>Motivo:</strong> ${atencionMedica.motivoAte}</p>
        <p><strong>Enfermedad Actual:</strong> ${atencionMedica.enfermedadActualAte}</p>
        <p><strong>Tratamiento:</strong> ${atencionMedica.tratamientoAte}</p>
        <p><strong>Fecha de la atención:</strong> ${atencionMedica.fechaAtencionAte}</p>
      `,
    });
  }



}
