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
      console.log('Datos recibidos:', referencias); // Agrega esta línea para depuración
      this.referencias = referencias;
    }, error => {
      console.error('Error al cargar referencias:', error);
    });
  }
  
  // cargarReferencias(): void {
  //   this.referenciaService.getReferencias().subscribe(referencias => {
  //     referencias = this.referencias = referencias;
  //   });
  // }
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
          this.referencias=this.referencias.filter(ReferenciaMedica=>ReferenciaMedica.id_ref !==id);
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
        <p><strong>Departamento:</strong> ${referencia.departamento_ref}</p>
        <p><strong>Especialidad:</strong> ${referencia.especialidad_ref}</p>
        <p><strong>Establecimiento:</strong> ${referencia.establecimiento_ref}</p>
        <p><strong>Hallazgos MSP:</strong> ${referencia.hallazgos_ref}</p>
        <p><strong>Institución:</strong> ${referencia.institucion_ref}</p>
        <p><strong>Motivo:</strong> ${referencia.motivo_referencia_ref}</p>
        <p><strong>Resumen:</strong> ${referencia.resumen_ref}</p>
        <p><strong>Servicio:</strong> ${referencia.servicio_ref}</p>
      `,
    });
  }
  
}
