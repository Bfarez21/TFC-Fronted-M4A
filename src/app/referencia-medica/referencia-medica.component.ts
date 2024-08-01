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
  referencia: ReferenciaMedica = new ReferenciaMedica();


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
    this.referenciaService.getReferencias().subscribe(
      referencias => {
        this.referencias = referencias;
      },
      error => {
        console.error('Error al cargar referencias:', error);
        console.log('Detalles del error:', error);

      }
    );
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


  verDetalles(referencia: ReferenciaMedica): void {
    const diagnosticosHtml = referencia.diagnosticos.map(diagnostico => `
      <li>
      <td>ID: ${diagnostico.id_dia}</td>
      <td>Diagnostico: ${diagnostico.diagnostico_dia || 'No especificado'}</td>
      <td>Codigo: ${diagnostico.codigo_dia || 'No especificado'}</td>
      <td>Tipo: ${diagnostico.estado_dia ? 'Presuntivo' : 'Definitivo'}</td>
    </li>
  `).join('');

    Swal.fire({
      title: `${referencia.entidad_sistema_ref}`,
      html: `
        <p><strong>Fecha:</strong> ${referencia.fecha_ref}</p>
        <p><strong>ID atencion medica:</strong> ${referencia.atencionMedica?.idAte}</p>
        <p><strong>Paciente:</strong> ${referencia.atencionMedica?.fichaMedica.paciente.cedulaPac} - ${referencia.atencionMedica?.fichaMedica.paciente.nombrePac} ${referencia.atencionMedica?.fichaMedica.paciente.apellidoPac}</p>
        <p><strong>Entidad:</strong> ${referencia.entidad_sistema_ref}</p>
        <p><strong>Especialidad:</strong> ${referencia.especialidad_ref}</p>
        <p><strong>Establecimiento:</strong> ${referencia.establecimiento_ref}</p>
        <p><strong>Hallazgos MSP:</strong> ${referencia.hallazgos_ref}</p>
        <p><strong>Institución:</strong> ${referencia.institucion_ref}</p>
        ${referencia.motivo_limitada_ref ? `<p><strong>Motivo: Limitada capacidad resolutiva</strong></p>` : ''}
      ${referencia.motivo_falta_ref ? `<p><strong>Motivo: Falta de profesional</strong></p>` : ''}
      ${referencia.motivo_otros_ref ? `<p><strong>Motivo: Otros</strong></p>` : ''}
        <p><strong>Resumen:</strong> ${referencia.resumen_ref}</p>
        <p><strong>Servicio:</strong> ${referencia.servicio_ref}</p>
        <p><strong>Diagnósticos:</strong></p>
        <ul>${diagnosticosHtml}</ul>
      `,
    });
  }




}
