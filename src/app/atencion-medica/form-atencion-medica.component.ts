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

  examenPiel: ExamenFisico = new ExamenFisico();
  examenCabeza: ExamenFisico = new ExamenFisico();
  examenCuello: ExamenFisico = new ExamenFisico();
  examenTorax: ExamenFisico = new ExamenFisico();
  examenCorazon: ExamenFisico = new ExamenFisico();
  examenAbdomen: ExamenFisico = new ExamenFisico();
  examenInguinal: ExamenFisico = new ExamenFisico();
  examenSuperior: ExamenFisico = new ExamenFisico();
  examenInferior: ExamenFisico = new ExamenFisico();
  
  signoPA: AtencionSigno = new AtencionSigno();
  signoPeso: AtencionSigno = new AtencionSigno();
  signoTalla: AtencionSigno = new AtencionSigno();
  signoIMC: AtencionSigno = new AtencionSigno();
  signoFC: AtencionSigno = new AtencionSigno();
  signoFR: AtencionSigno = new AtencionSigno();
  signoT: AtencionSigno = new AtencionSigno();
  signoSat: AtencionSigno = new AtencionSigno();
  signoGlasgow: AtencionSigno = new AtencionSigno();
  signoOcular: AtencionSigno = new AtencionSigno();
  signoVerbal: AtencionSigno = new AtencionSigno();
  signoMotora: AtencionSigno = new AtencionSigno();
  signoTotal: AtencionSigno = new AtencionSigno();
  signollenado: AtencionSigno = new AtencionSigno();
  signoRPupilar: AtencionSigno = new AtencionSigno();

  examenComplementario: ExamenComplementario = new ExamenComplementario();

  diagnostico1: Diagnostico = new Diagnostico();
  diagnostico2: Diagnostico = new Diagnostico();
  diagnostico3: Diagnostico = new Diagnostico();

  signosVitales: SignoVital[] = []


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
    this.cargarSignosVitales();
    console.log(this.signosVitales.length)
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

    this.examenPiel.nombreExa = "PIEL Y FANERAS"
    this.examenCabeza.nombreExa = "CABEZA";
    this.examenCuello.nombreExa = "CUELLO";
    this.examenTorax.nombreExa = "TÓRAX";
    this.examenCorazon.nombreExa = "CORAZÓN";
    this.examenAbdomen.nombreExa = "ABDOMEN";
    this.examenInguinal.nombreExa = "R. INGUINAL";
    this.examenSuperior.nombreExa = "M. SUPERIORES";
    this.examenInferior.nombreExa = "M. INFERIORES";

    this.signoPA.signosVitales = this.signosVitales[0];
    this.signoPeso.signosVitales = this.signosVitales[1] ;
    this.signoTalla.signosVitales = this.signosVitales[2];
    this.signoIMC.signosVitales = this.signosVitales[3]
    this.signoFC.signosVitales = this.signosVitales[4]
    this.signoFR.signosVitales = this.signosVitales[5];
    this.signoT.signosVitales = this.signosVitales[6];
    this.signoSat.signosVitales = this.signosVitales[7];
    this.signoGlasgow.signosVitales = this.signosVitales[8];
    this.signoOcular.signosVitales = this.signosVitales[9];
    this.signoVerbal.signosVitales = this.signosVitales[10];
    this.signoMotora.signosVitales = this.signosVitales[11];
    this.signoTotal.signosVitales = this.signosVitales[12];
    this.signollenado.signosVitales = this.signosVitales[13];
    this.signoRPupilar.signosVitales = this.signosVitales[14];

  }
  


  cargarSignosVitales(): void {
    this.signoVitalService.getSignosVitales().subscribe(
      (data: SignoVital[]) => {
        this.signosVitales = data;  // Asignar los datos recibidos a la propiedad
      },
      error => {
        console.error('Error al cargar los signos vitales', error);
      }
    );
  }


}
