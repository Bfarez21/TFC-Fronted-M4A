import { Component, OnInit } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Paciente } from '../ficha-medica/modelo/paciente';
import { AtenMedService } from './atenmed.service';
import { AtencMed } from './atenmed';
import { ImpresionService } from './impresion.service';



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  patients: Paciente[] = [];
  atenciones: AtencMed[] = [];
  cedulaBusqueda: string = '';
  pacEncontrado: Paciente | null = null;

  constructor(
    private pacienteService: PacienteService, 
    private atenmedservice: AtenMedService,
    private impresionservice: ImpresionService
  ) {}

  ngOnInit(): void {
    this.viewPatient();
    this.viewAtenciones();
  }

  viewPatient(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      console.log('Pacientes:', pacientes);
      this.patients = pacientes; 
    });
  } 

  viewAtenciones(): void {
    this.atenmedservice.getAten().subscribe(atenciones => {
      console.log('Atenciones recibidas:', atenciones);
      this.atenciones = atenciones;
    });
  }

  buscar(): void {
    if (this.cedulaBusqueda) {
      this.pacienteService.buscarPorCedula(this.cedulaBusqueda).subscribe(
        paciente => {
          this.pacEncontrado = paciente;
        },
        error => {
          console.error('Error al buscar el paciente:', error);
          this.pacEncontrado = null;
        }
      );
    }
  }

  Imprimir(): void {
    const encabezado = ["ID", "Nombre", "Cedula", "Motivo", "Fecha de Nacimiento", "Carrera", "Fecha de Visita", "Receta"];
    const cuerpo = this.atenciones.map(atenciones => [
      atenciones.fichaMedica.paciente.idPac,
      atenciones.fichaMedica.paciente.nombrePac + ' ' + atenciones.fichaMedica.paciente.apellidoPac,
      atenciones.fichaMedica.paciente.cedulaPac,
      atenciones.motivoAte,
      atenciones.fichaMedica.paciente.fechaNacimientoPac,
      atenciones.fichaMedica.paciente.carreraPac,
      atenciones.fechaAtencionAte,
      atenciones.tratamientoAte
    ]);
    this.impresionservice.imprimir(encabezado, cuerpo, "Listado De Pacientes", true);
  }

  refrescar(): void {
    this.viewPatient(); 
    this.cedulaBusqueda = ''; 
    this.pacEncontrado = null; 
  }
}
