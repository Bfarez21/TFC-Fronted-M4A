import { Component } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Paciente } from '../ficha-medica/modelo/paciente';
import { AtenMedService } from './atenmed.service';
import { AtencMed } from './atenmed';
import { ImpresionService } from './impresion.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
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
    this.viewPatient(); // Llama a cargarPacientes()
  } 

  viewPatient(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
       pacientes = this.patients=pacientes; // Asigna los pacientes obtenidos del servicio a la propiedad del componente
    });
  }

  viewAte(): void {
    this.atenmedservice.getAten().subscribe(atencion => {
      atencion = this.atenciones=atencion;
    })
  }
  // BOTON BUSCAR 
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
    const encabezado = ["ID","Nombre", "Cedula", "Motivo", "Fecha de Nacimiento", "Carrera", "Fecha de Visita", "Receta"];
    const cuerpo = this.patients.map(paciente => [
      paciente.idPac,
      paciente.nombrePac + ' '+ paciente.apellidoPac,
      paciente.cedulaPac,
      "MOTIVO",
      paciente.fechaNacimientoPac,
      paciente.carreraPac,
      "FECHA",
      "RECETA"
    ]);
    this.impresionservice.imprimir(encabezado, cuerpo, "Listado De Pacientes", true);
  }

  ImprimirPac(paciente: any): void {
    const encabezado = ["ID", "Nombre", "Cedula", "Motivo", "Fecha de Nacimiento", "Carrera", "Fecha de Visita", "Receta"];
    
    const cuerpo = [[
        paciente.idPac,
        paciente.nombrePac + ' ' + paciente.apellidoPac,
        paciente.cedulaPac,
        "MOTIVO",
        paciente.fechaNacimientoPac,
        paciente.carreraPac,
        "FECHA",
        "RECETA"
    ]];
    
    this.impresionservice.imprimir(encabezado, cuerpo, "Información del Paciente", true);
  }
}
