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
export class FormAtencionMedicaComponent implements OnInit {

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
    private router: Router,
    private atencionMedicaService: AtencionMedicaService,
    private fichaMedicaService: FichaMedicaService,
    private pacienteService: PacienteService,
    private activateRouter: ActivatedRoute,
    private examenComplementarioService: ExamenComplementarioService,
    private emergenciaObstetricaService: EmergenciaObstetricaService,
    private enfermedadesService: EnfermedadesService,
    private diagnosticoService: DiagnosticoService,
    private signoVitalService: SignoVitalService,
    private doctorService: DoctorService


  ) { }

  // metodo regresar ventana anterior
  cancelar() {
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

  cargarFichaMedica(): void {
    this.activateRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.fichaMedicaService.getFichas(id).subscribe((fichaMedica) => this.fichaMedica = fichaMedica)
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

          if (fichaMedica.paciente.generoPac == 'femenino' || fichaMedica.paciente.generoPac === 'F') {
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

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  /**
 * Maneja la selección de archivos PDF
 */
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea PDF
      if (file.type !== 'application/pdf') {
        Swal.fire({
          title: 'Archivo inválido',
          text: 'Solo se permiten archivos PDF',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
        return;
      }

      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          title: 'Archivo muy grande',
          text: 'El archivo no puede ser mayor a 10MB',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
        return;
      }

      // Asignar el archivo al examen
      this.atencionMedica.examenesComplementarios[index].archivoPdfFile = file;
      this.atencionMedica.examenesComplementarios[index].nombreArchivo = file.name;
      this.atencionMedica.examenesComplementarios[index].tipoContenido = file.type;
      this.atencionMedica.examenesComplementarios[index].tamañoArchivo = file.size;

      console.log(`Archivo seleccionado para examen ${index}:`, file.name);
    }
  }
  /** 
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
  }*/

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


  /**
 * Método create() mejorado - SIN conversión a base64
 */
  async create(): Promise<void> {
    this.atencionMedica.fechaAtencionAte = new Date();

    if (!this.fichaMedica || !this.doctor) {
      Swal.fire({
        title: 'Error',
        text: 'Faltan datos del doctor o ficha médica',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
      return;
    }

    // Asignar datos del doctor
    this.atencionMedica.doctor.idDoctor = this.doctor.idDoctor;
    this.atencionMedica.doctor.cedulaDoc = this.doctor.cedulaDoc;
    this.atencionMedica.doctor.nombreDoc = this.doctor.nombreDoc + " " + this.doctor.apellidoDoc;

    // ✅ CORRECCIÓN PRINCIPAL: Asignar la ficha médica completa con su ID
    this.atencionMedica.fichaMedica = {
      idFic: this.fichaMedica.idFic,
      // Puedes incluir otros campos si los necesitas, pero el ID es lo esencial
      paciente: this.fichaMedica.paciente,
      fechaElaboracionFic: this.fichaMedica.fechaElaboracionFic,
      discapacidad: this.fichaMedica.discapacidad,
      antecedenteFamiliar: this.fichaMedica.antecedenteFamiliar
    };

    console.log("Paciente asignado:", this.atencionMedica.fichaMedica.paciente);

    try {
      // 1. Crear la atención médica SIN los PDFs
      const atencionCreada = await this.atencionMedicaService.create(this.atencionMedica).toPromise();

      if (!atencionCreada || !atencionCreada.idAte) {
        throw new Error('No se pudo crear la atención médica');
      }

      console.log('Atención médica creada con ID:', atencionCreada.idAte);

      // 2. Subir los PDFs uno por uno
      const uploadPromises = this.atencionMedica.examenesComplementarios
        .map(async (examen, index) => {
          if (examen.archivoPdfFile) {
            try {
              console.log(`Subiendo PDF para examen ${index}: ${examen.tituloExa}`);
              const response = await this.atencionMedicaService.subirPdfExamen(
                atencionCreada.idAte!,
                index,
                examen.archivoPdfFile
              ).toPromise();
              console.log(`✅ PDF ${index} subido:`, response);
              return { index, success: true, response };
            } catch (error) {
              console.error(`❌ Error subiendo PDF ${index}:`, error);
              return { index, success: false, error };
            }
          }
          return { index, success: true, response: 'No hay archivo' };
        });

      // Esperar a que se suban todos los PDFs
      const uploadResults = await Promise.all(uploadPromises);

      // Verificar resultados
      const errores = uploadResults.filter(result => !result.success);
      if (errores.length > 0) {
        console.warn('Algunos PDFs no se pudieron subir:', errores);
        Swal.fire({
          title: 'Atención guardada con advertencias',
          text: `La atención médica se guardó, pero ${errores.length} archivo(s) PDF no se pudieron subir.`,
          icon: 'warning',
          confirmButtonColor: '#f59e0b'
        });
      } else {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Atención médica y archivos PDF guardados correctamente',
          icon: 'success',
          confirmButtonColor: '#16a34a'
        });
      }

      this.router.navigate(['/atencion-medica']);

    } catch (error) {
      console.error('Error al guardar atención médica:', error);
      Swal.fire({
        title: 'Error al guardar',
        text: 'Revisa los datos ingresados y conexión a internet',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
    }
  }




  addDiagnostico(): void {
    const newDiagnostico = new Diagnostico();
    this.atencionMedica.diagnosticos.push(newDiagnostico);

  }

  eliminarDiagnostico(index: number) {
    this.atencionMedica.diagnosticos.splice(index, 1);
  }

  addExamenComplementario(): void {
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
