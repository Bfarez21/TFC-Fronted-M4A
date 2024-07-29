import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtencionMedica } from './modelo/atencion-medica';
import { Paciente } from '../ficha-medica/modelo/paciente';
import { FichaMedicaService } from '../ficha-medica/servicio/ficha-medica.service';
import { PacienteService } from '../reportes/paciente.service';
import { FichaMedica } from '../ficha-medica/modelo/ficha-medica';
import { ExamenFisico } from './modelo/examen-fisico';
import { AtencionSigno } from './modelo/atencion-signo';
import { ExamenComplementario } from './modelo/examen-complementario';
import { Diagnostico } from '../referencia-medica/diagnostico/diagnostico';
import Swal from 'sweetalert2';
import { DiagnosticoService } from '../referencia-medica/diagnostico/diagnostico.service';
import { SignoVital } from './modelo/signo-vital';
import { SignoVitalService } from './service/signo-vital.service';
import { Enfermedades } from '../enfermedades/Enfermedades';

@Component({
  selector: 'app-form-atencion-medica',
  templateUrl: './form-atencion-medica.component.html',
  styleUrl: './form-atencion-medica.component.css'
})
export class FormAtencionMedicaComponent implements OnInit{

  editMode: boolean = false; 
  cedulaBusqueda: string = '';
  atencionMedicaEncontrado: AtencionMedica | null = null;
  pacienteEncontrado: Paciente | null = null;
  fichaMedica: FichaMedica | null = null;
  atencionMedica: AtencionMedica = new AtencionMedica();

  diagnosticos: Diagnostico[] = [];
  addDiagnostico() {
    this.atencionMedica.diagnosticos.push(new Diagnostico());
  }

  eliminarDiagnostico(index: number) {
    this.atencionMedica.diagnosticos.splice(index, 1);
  }

  addExamenComplementario() {
    this.atencionMedica.examenescomplementarios.push(new ExamenComplementario());
  }

  eliminarExamenComplementario(index: number) {
    this.atencionMedica.examenescomplementarios.splice(index, 1);
  }

  constructor(
    private router:Router,
    private fichaMedicaService: FichaMedicaService,
    private pacienteService: PacienteService,
    private activateRouter:ActivatedRoute,
    private diagnosticoService: DiagnosticoService,
    private signoVitalService: SignoVitalService
    
    
  ){}

  // metodo regresar ventana anterior
  cancelar(){
    this.router.navigate(['/atencion-medica'])
}

  ngOnInit(): void {
  }

  cargarFichaMedica():void{
    this.activateRouter.params.subscribe(params=>{
        let id=params['id']
        if(id){
            this.fichaMedicaService.getFichas(id).subscribe((fichaMedica)=>this.fichaMedica=fichaMedica)
            this.editMode = true; // Deshabilitar el modo de edición
        }
    })
  }

  buscar(): void {
    if (this.cedulaBusqueda) {
      this.pacienteService.buscarPorCedula(this.cedulaBusqueda).subscribe(
        paciente => {
          console.log('Paciente encontrado:', paciente); 
          this.pacienteEncontrado = paciente;

          this.buscarFicha();

        },
        error => {
          console.error('Error al buscar al paciente:', error);
          this.pacienteEncontrado = null;
        }
      );
    } else {
      alert('Por favor ingresa una cédula.');
    }
  }

  buscarFicha(): void {
    if (this.pacienteEncontrado) {
      this.fichaMedicaService.getFichaPaciente(this.pacienteEncontrado.idPac).subscribe(
        fichaMedica => {
          console.log('Ficha encontrado:', fichaMedica);
          this.fichaMedica = fichaMedica;
        },
        error => {
          console.error('Error al buscar al paciente:', error);
          this.pacienteEncontrado = null;
        }
      );
    } else {
      console.error('No se puede buscar ficha: paciente no encontrado.');
    }
  }  

  

  public create(): void {

  }


}
