import { Component, OnInit } from '@angular/core';
import { ReferenciaMedicaService } from './referencia-medica.service';
import { ReferenciaMedica } from './referencia-medica';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referencia-medica',
  templateUrl: './index-referencia-medica.component.html',
  styleUrls: ['./referencia-medica.component.css']
})
export class ReferenciaMedicaComponent {

  referencias: ReferenciaMedica[] = [];

  constructor(private referenciaService: ReferenciaMedicaService) {}

  ngOnInit(): void {
    this.cargarReferencias();
  }

  cargarReferencias(): void {
    this.referenciaService.getReferencias().subscribe(referencias => {
      referencias = this.referencias = referencias;
    });
  }
  //Eliminar referencias
  deleteReferencia(id:number):void{
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
          this.referencias=this.referencias.filter(ReferenciaMedica=>ReferenciaMedica.idRef !==id);
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
      title: `${referencia.entidadSistemaRef}`,
      html: `
        <p><strong>Fecha:</strong> ${referencia.fechaRef}</p>
        <p><strong>Entidad del sistema:</strong> ${referencia.departamentoRef}</p>
        <p><strong>Especialidad:</strong> ${referencia.especialidadRef}</p>
        <p><strong>Establecimiento:</strong> ${referencia.establecimientoRef}</p>
        <p><strong>Hallazgos MSP:</strong> ${referencia.hallazgosRef}</p>
        <p><strong>Institución:</strong> ${referencia.institucionRef}</p>
        <p><strong>Motivo:</strong> ${referencia.motivoRef}</p>
        <p><strong>Resumen:</strong> ${referencia.resumenRef}</p>
        <p><strong>Servicio:</strong> ${referencia.servicioRef}</p>
      `,
    });
  }
}
