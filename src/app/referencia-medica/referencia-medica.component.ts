import { Component, OnInit } from '@angular/core';
import { ReferenciaMedicaService } from './referencia-medica.service';
import { ReferenciaMedica } from './referencia-medica';
import Swal from 'sweetalert2';
import { AtencionMedica } from '../atencion-medica/modelo/atencion-medica';
import { AtencionMedicaService } from '../atencion-medica/service/atencion-medica.service';

@Component({
  selector: 'app-referencia-medica',
  templateUrl: './index-referencia-medica.component.html',
  styleUrls: ['./referencia-medica.component.css']
})
export class ReferenciaMedicaComponent implements OnInit {

  referencias: ReferenciaMedica[] = [];
  atencionesMedicas: AtencionMedica[] = [];
  referencia: ReferenciaMedica = new ReferenciaMedica(); // Asegúrate de tener una instancia de ReferenciaMedica


  constructor(private referenciaService: ReferenciaMedicaService,
    private atencionMedicaService: AtencionMedicaService
  ) { }

  ngOnInit(): void {
    this.cargarReferencias();
    this.atencionMedicaService.getAtencionesMedicas().subscribe(
      (data: AtencionMedica[]) => {
        this.atencionesMedicas = data;
      },
      error => {
        console.error('Error al obtener atenciones médicas:', error);
      }
    );
  
  }
  
  
  cargarReferencias(): void {
    this.referenciaService.getReferencias().subscribe(referencias => {
      this.referencias = referencias;
    }, error => {
      console.error('Error al cargar referencias:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar las referencias médicas. Inténtelo de nuevo más tarde.'
    });
  });
  }


  //Eliminar referencias
  deleteReferencia(id: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.referenciaService.deleteReferencia(id).subscribe(response => {
          this.referencias = this.referencias.filter(ReferenciaMedica => ReferenciaMedica.id_ref !== id);
          Swal.fire({
            title: 'Eliminado!',
            text: 'Su registro ha sido eliminado.',
            icon: 'success'
          });
        });
      }
    });
  }

  // uso Sweetalert para mostrar datos de un registro y asigno en el boton ver
  verDetalles(referencia: ReferenciaMedica): void {
    Swal.fire({
      title: `${referencia.entidad_sistema_ref}`,
      html: `
        <p><strong>Fecha:</strong> ${referencia.fecha_ref}</p>
        <p><strong>ID atencion medica:</strong> ${referencia.atencionMedica?.idAte}</p>
        <p><strong>Entidad:</strong> ${referencia.entidad_sistema_ref}</p>
        <p><strong>Especialidad:</strong> ${referencia.especialidad_ref}</p>
        <p><strong>Establecimiento:</strong> ${referencia.establecimiento_ref}</p>
        <p><strong>Hallazgos MSP:</strong> ${referencia.hallazgos_ref}</p>
        <p><strong>Institución:</strong> ${referencia.institucion_ref}</p>
        <p><strong>Motivo:</strong> ${referencia.motivo_limitada_ref}</p>
        <p><strong>Resumen:</strong> ${referencia.resumen_ref}</p>
        <p><strong>Servicio:</strong> ${referencia.servicio_ref}</p>
      `,
    });
  }
  

}
