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
import Swal from 'sweetalert2';
import { SignoVital } from './modelo/signo-vital';
import { SignoVitalService } from './service/signo-vital.service';
import { Enfermedades } from '../enfermedades/Enfermedades';
import { Diagnostico } from './modelo/diagnostico';
import { DiagnosticoService } from './service/diagnostico.service';
import { EmergenciaObstetrica } from './modelo/emergencia-obstetrica';
import { EmergenciaObstetricaService } from './service/emergencia-obstetrica.service';
import { ExamenComplementarioService } from './service/examen-complementario.service';
import { EnfermedadesService } from '../enfermedades/enfermedades.service';
import { AtencionMedicaService } from './service/atencion-medica.service';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/doctor';

@Component({
  selector: 'app-form-atencion-medica',
  templateUrl: './form-atencion-medica.component.html',
  styleUrl: './form-atencion-medica.component.css'
})
export class FormAtencionMedicaComponent implements OnInit{

  signosVitales: SignoVital[] = [];
  enfermedades: Enfermedades[] = [];
  diagnosticos: Diagnostico[] = [];
  examenesComplementarios: ExamenComplementario[] = [];
  doctor: Doctor = new Doctor();

  pielExamen: ExamenFisico = new ExamenFisico();
  cabezaExamen: ExamenFisico = new ExamenFisico();
  cuelloExamen: ExamenFisico = new ExamenFisico();
  toraxExamen: ExamenFisico = new ExamenFisico();
  corazonExamen: ExamenFisico = new ExamenFisico();
  abdomenExamen: ExamenFisico = new ExamenFisico();
  inguinalExamen: ExamenFisico = new ExamenFisico();
  superioresExamen: ExamenFisico = new ExamenFisico();
  inferioresExamen: ExamenFisico = new ExamenFisico();

  paSigno: AtencionSigno = new AtencionSigno();
  pesoSigno: AtencionSigno = new AtencionSigno();
  tallaSigno: AtencionSigno = new AtencionSigno();
  imcSigno: AtencionSigno = new AtencionSigno();
  fcSigno: AtencionSigno = new AtencionSigno();
  frSigno: AtencionSigno = new AtencionSigno();
  tSigno: AtencionSigno = new AtencionSigno();
  satSigno: AtencionSigno = new AtencionSigno();
  ocularSigno: AtencionSigno = new AtencionSigno();
  verbalSigno: AtencionSigno = new AtencionSigno();
  motoraSigno: AtencionSigno = new AtencionSigno();
  capilarSigno: AtencionSigno = new AtencionSigno();
  pupilarSigno: AtencionSigno = new AtencionSigno();
  totalSigno: AtencionSigno = new AtencionSigno();

  editMode: boolean = false; 
  cedulaBusqueda: string = '';
  atencionMedicaEncontrado: AtencionMedica | null = null;
  pacienteEncontrado: Paciente | null = null;
  fichaMedica: FichaMedica = new FichaMedica();
  emergenciaObstetrica: EmergenciaObstetrica | null = null;
  atencionMedica: AtencionMedica = new AtencionMedica();

  filteredEnfermedades: { [key: number]: Enfermedades[] } = {};
  searchQuery: string = '';


  constructor(
    private router:Router,
    private atencionMedicaService: AtencionMedicaService,
    private fichaMedicaService: FichaMedicaService,
    private pacienteService: PacienteService,
    private activateRouter:ActivatedRoute,
    private examenComplementarioService: ExamenComplementarioService,
    private emergenciaObstetricaService: EmergenciaObstetricaService,
    private enfermedadesService: EnfermedadesService,
    private diagnosticoService: DiagnosticoService,
    private signoVitalService: SignoVitalService,
    private doctorService: DoctorService
    
    
  ){}

  // metodo regresar ventana anterior
  cancelar(){
    this.router.navigate(['/atencion-medica'])
}

  ngOnInit(): void {
    this.recuperarSignosVitales();
    this.inicializadorListas();
    this.recuperarEnfermedades();
    this.doctorService.buscarPorCedula("0102030405").subscribe(
      doctor => {
        this.doctor = doctor;
      },
      error => {
        console.error('Error al buscar el doctor:', error);

      }
      
    );
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

          if(fichaMedica.paciente.generoPac == 'femenino' || fichaMedica.paciente.generoPac === 'F') {
            this.buscarEmergenciObstetrica();
          }
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

  buscarEmergenciObstetrica(): void {
    if (this.fichaMedica) {
      this.emergenciaObstetricaService.getfichaEmergencia(this.fichaMedica.idFic).subscribe(
        emergenciaObstetrica => {
          console.log('Ficha encontrado:', emergenciaObstetrica);
          this.emergenciaObstetrica = emergenciaObstetrica;
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

  inicializarSignoAtencion() {
    if (this.signosVitales.length > 0) {
      
    }

  }

  recuperarSignosVitales(): void {
    this.signoVitalService.getSignosVitales().subscribe(signosVitales => {
      signosVitales = this.signosVitales = signosVitales; 
      console.log("Se ha recuperado " + this.signosVitales.length + " signos vitales.")
      
    });
  }

  recuperarEnfermedades(): void {
    this.enfermedadesService.getEnfermedades().subscribe(enfermedades => {
      enfermedades = this.enfermedades = enfermedades; 
      console.log("Se ha recuperado " + this.enfermedades.length + " enfermedades.")
      
    });
  }

  totalGlasgow(): number {
    const ocular = this.ocularSigno.valorAts || 0;
    const verbal = this.verbalSigno.valorAts || 0;
    const motora = this.motoraSigno.valorAts || 0;
    return ocular + verbal + motora;
  }

  private limitValue(value: number): number {
    return Math.max(0, Math.min(value, 5));
  }

  // Función para validar y ajustar el valor del campo
  validateValue(value: number, field: string): void {
    const limitedValue = this.limitValue(value);
    switch (field) {
      case 'ocular':
        this.ocularSigno.valorAts = limitedValue;
        break;
      case 'verbal':
        this.verbalSigno.valorAts = limitedValue;
        break;
      case 'motora':
        this.motoraSigno.valorAts = limitedValue;
        break;
    }
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.examenComplementarioService.uploadPdf(this.atencionMedica.examenesComplementarios[index].idExa, file)
        .subscribe(
          () => console.log('PDF subido exitosamente'),
          error => console.error('Error al subir PDF', error)
        );
  }}

  uploadAllFiles() {
      this.atencionMedica.examenesComplementarios.forEach(examen => {
        if (examen.archivoPdf) {
          this.examenComplementarioService.uploadPdf(examen.idExa, examen.archivoPdf)
            .subscribe(
              () => console.log(`PDF subido exitosamente para el examen con id ${examen.idExa}`),
              error => console.error(`Error al subir PDF para el examen con id ${examen.idExa}`, error)
            );
        }
      });
  }

  filterEnfermedades(event: any, index: number): void {
    const query = event.target.value.toLowerCase();
    if (query.length > 0) {
      this.filteredEnfermedades[index] = this.enfermedades.filter(enfermedad => 
        enfermedad.nombreEnf.toLowerCase().includes(query)
      );
    } else {
      this.filteredEnfermedades[index] = [];
    }
  }

  selectEnfermedad(enfermedad: Enfermedades, index: number): void {
    this.atencionMedica.diagnosticos[index].enfermedad = enfermedad;
    this.filteredEnfermedades[index] = [];
  }


  create(): void {    

    

    this.atencionMedica.fechaAtencionAte = new Date();

    if (this.fichaMedica) {
    

      if(this.doctor) {
        this.atencionMedica.doctor = this.doctor;
        this.atencionMedica.fichaMedica = this.fichaMedica;

      this.atencionMedicaService.create(this.atencionMedica)
        .subscribe(
           atencionMedica=> {this.router.navigate(['/'])
           Swal.fire('ATENCION MEDICA GUARDADA')

           }
          );
      }
    } else {
      console.error('FichaMedica no está definido.');
    }
    
    
  }




  addDiagnostico():void {
    const newDiagnostico = new Diagnostico();
    this.atencionMedica.diagnosticos.push(newDiagnostico);
    
  }

  eliminarDiagnostico(index: number) {
    this.atencionMedica.diagnosticos.splice(index, 1);
  }

  addExamenComplementario():void {
    this.atencionMedica.examenesComplementarios.push(new ExamenComplementario());
  }

  eliminarExamenComplementario(index: number) {
    this.atencionMedica.examenesComplementarios.splice(index, 1);
  }

  inicializadorListas(): void {
    const signosAtencion = [
      this.paSigno,
      this.pesoSigno,
      this.tallaSigno,
      this.imcSigno,
      this.fcSigno,
      this.frSigno,
      this.tSigno,
      this.satSigno,
      this.ocularSigno,
      this.verbalSigno,
      this.motoraSigno,
      this.capilarSigno,
      this.pupilarSigno,
      this.totalSigno
    ];

    const examenesFisicos = [
      this.pielExamen,
      this.cabezaExamen,
      this.cuelloExamen,
      this.toraxExamen,
      this.corazonExamen,
      this.abdomenExamen,
      this.inguinalExamen,
      this.superioresExamen,
      this.inferioresExamen
    ];

    this.atencionMedica.atencionesSignos = signosAtencion;
    this.atencionMedica.examenesFisicos = examenesFisicos;

    this.atencionMedica.examenesFisicos[0].nombreExa = 'PIEL Y FANERAS';
    this.atencionMedica.examenesFisicos[1].nombreExa = 'CABEZA';
    this.atencionMedica.examenesFisicos[2].nombreExa = 'CUELLO';
    this.atencionMedica.examenesFisicos[3].nombreExa = 'TÓRAX';
    this.atencionMedica.examenesFisicos[4].nombreExa = 'CORAZÓN';
    this.atencionMedica.examenesFisicos[5].nombreExa = 'ABDOMEN';
    this.atencionMedica.examenesFisicos[6].nombreExa = 'R. INGUINAL';
    this.atencionMedica.examenesFisicos[7].nombreExa = 'M.SUPERIORES';
    this.atencionMedica.examenesFisicos[8].nombreExa = 'M.INFERIORES';

    this.atencionMedica.atencionesSignos[0].signoVital = this.signosVitales[0];
    this.atencionMedica.atencionesSignos[1].signoVital = this.signosVitales[1];
    this.atencionMedica.atencionesSignos[2].signoVital = this.signosVitales[2];
    this.atencionMedica.atencionesSignos[3].signoVital = this.signosVitales[3];
    this.atencionMedica.atencionesSignos[4].signoVital = this.signosVitales[4];
    this.atencionMedica.atencionesSignos[5].signoVital = this.signosVitales[5];
    this.atencionMedica.atencionesSignos[6].signoVital = this.signosVitales[6];
    this.atencionMedica.atencionesSignos[7].signoVital = this.signosVitales[7];
    this.atencionMedica.atencionesSignos[8].signoVital = this.signosVitales[9];
    this.atencionMedica.atencionesSignos[9].signoVital = this.signosVitales[10];
    this.atencionMedica.atencionesSignos[10].signoVital = this.signosVitales[11];
    this.atencionMedica.atencionesSignos[11].signoVital = this.signosVitales[12];
    this.atencionMedica.atencionesSignos[12].signoVital = this.signosVitales[13];
    this.atencionMedica.atencionesSignos[13].signoVital = this.signosVitales[14];

    
  
  }
  

}
