import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReferenciaMedicaService } from '../referencia-medica.service';
import Swal from 'sweetalert2';

import { Doctor } from '../../doctor/doctor';
import { ReferenciaMedica } from '../referencia-medica';
import { Diagnostico } from '../diagnostico/diagnostico';
import { Enfermedades } from '../../enfermedades/Enfermedades';
import { EnfermedadesService } from '../../enfermedades/enfermedades.service';
import { PacienteService } from '../../ficha-medica/servicio/paciente.service';
import { FichaMedica } from '../../ficha-medica/modelo/ficha-medica';
import { FichaMedicaService } from '../../ficha-medica/servicio/ficha-medica.service';
import { DoctorService } from '../../doctor/doctor.service';
import { AtenMedService } from '../../reportes/atenmed.service';
import { AtencionMedicaService } from '../../atencion-medica/service/atencion-medica.service';

@Component({
  selector: 'app-form-ref-medica',
  templateUrl: './form-ref-medica.component.html',
  styleUrls: ['./form-ref-medica.component.css']
})
export class FormRefMedicaComponent implements OnInit {

  public referencia: ReferenciaMedica = new ReferenciaMedica()
  public enfermedades: Enfermedades[] = [];
  public doctores: Doctor[] = []
  public searchTerm: string = '';
  public filteredEnfermedades: { [key: number]: Enfermedades[] } = {};
  public showSuggestions: { [key: number]: boolean } = {};
  public activeEnfermedad: Enfermedades | null = null;
  public atencionesMedicas: any[] = [];
  editMode: boolean = false;

  constructor(
    private referenciaService: ReferenciaMedicaService,
    private enfermedadesService: EnfermedadesService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private doctorService: DoctorService,
    private atencionMedicaService: AtencionMedicaService,
    private pacienteService: PacienteService,
    private fichaService: FichaMedicaService
    
  ) {
    this.referencia.diagnosticos = []; // diagnósticos siempre esté inicializado
  }
  // Método para manejar la selección de Atención Médica
  onAtencionMedicaChange(event: any): void {
    const selectedValue = Number(event.target.value); // Convierte el valor a número
    this.referencia.atencionMedica = this.atencionesMedicas.find(atencion => atencion.idAte === selectedValue) || null;
  }
  
  cancelar() {
    this.router.navigate(['/referencia-medica']);
  }

  create(): void {
    if (!this.referencia.atencionMedica) {  // Verifica si no se ha seleccionado una atención médica
      Swal.fire('Error', 'Por favor seleccione una atención médica.', 'error');
      return;
    }
  
    console.log('Referencia a enviar:', this.referencia);
    this.referenciaService.create(this.referencia)
      .subscribe({
        next: referencia => {
          this.router.navigate(['/referencia-medica']);
          Swal.fire('Referencia Médica guardada', `Referencia Médica ${this.referencia.establecimiento_ref} guardada con éxito`, 'success');
          this.editMode = false;
        },
        error: error => {
          console.error('Error al guardar la referencia médica:', error);
  
          let errorMessage = 'Hubo un problema al guardar la referencia médica.';
  
          // Verifica si el error tiene un mensaje específico del backend
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error.status === 400) {
            errorMessage = 'La atención médica ya está asociada a otra referencia médica.';
          }
  
          Swal.fire('Error', errorMessage, 'error');
        }
      });
  }
  
 
  
  
  addDiagnostico() {
    const newDiagnostico = new Diagnostico();
    this.referencia.diagnosticos.push(newDiagnostico);
    this.filteredEnfermedades[this.referencia.diagnosticos.length - 1] = []; // Inicializa la lista filtrada para el nuevo diagnóstico
    this.showSuggestions[this.referencia.diagnosticos.length - 1] = false; // Inicializa el estado de las sugerencias
  }

  eliminarDiagnostico(index: number) {
    this.referencia.diagnosticos.splice(index, 1);
    delete this.filteredEnfermedades[index]; // Elimina la lista filtrada para el diagnóstico eliminado
    delete this.showSuggestions[index]; // Elimina el estado de las sugerencias para el diagnóstico eliminado
  }

  // metodo cargar pacientes en el form para editar
  cargarReferencia(): void {
    this.activateRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.referenciaService.getReferencia(id).subscribe((referencia) => this.referencia = referencia)
        this.editMode = true; // Deshabilitar el modo de edición
      }
    })
  }

  cargarEnfermedades(): void {
    this.enfermedadesService.getEnfermedades().subscribe(enfermedades => {
      this.enfermedades = enfermedades;
      this.referencia.diagnosticos.forEach((_, index) => {
        this.filteredEnfermedades[index] = enfermedades;
      });
    });
  }
  cargarDoctores(): void {
    this.doctorService.getDoctores().subscribe(doctores => this.doctores = doctores);
  }
  cargarAtencionesMedicas(): void {
    this.atencionMedicaService.getAtencionesMedicas().subscribe(atenciones => this.atencionesMedicas = atenciones);
  }
 
  
  ngOnInit(): void {
    this.cargarReferencia();
    this.cargarEnfermedades();
    this.cargarDoctores();
    this.cargarAtencionesMedicas();
  }

  
  
  //logica para agregar el nombre de las endermedades

  onSearch(index: number) {
    if (this.referencia.diagnosticos[index].searchTerm?.length > 0) {
      this.filteredEnfermedades[index] = this.enfermedades.filter(enf =>
        enf.nombreEnf.toLowerCase().includes(this.referencia.diagnosticos[index].searchTerm.toLowerCase())
      );
      this.showSuggestions[index] = this.filteredEnfermedades[index].length > 0;
    } else {
      this.filteredEnfermedades[index] = [];
      this.showSuggestions[index] = false;
    }
  }

  selectEnfermedad(enfermedad: Enfermedades, index: number) {
    this.referencia.diagnosticos[index].searchTerm = enfermedad.nombreEnf;
    this.referencia.diagnosticos[index].codigoEnfermedad = enfermedad.codigoEnf;
    this.filteredEnfermedades[index] = [];
    this.showSuggestions[index] = false;
  }

  onFocus(index: number) {
    if (this.referencia.diagnosticos[index].searchTerm?.length > 0 || this.filteredEnfermedades[index].length > 0) {
      this.showSuggestions[index] = true;
    }
  }
  onBlur(index: number) {
    setTimeout(() => {
      this.showSuggestions[index] = false;
    }, 500);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      Object.keys(this.showSuggestions).forEach(key => {
        this.showSuggestions[+key] = false;
      });
    }
  }

  onMouseOver(enfermedad: Enfermedades) {
    this.activeEnfermedad = enfermedad;
  }
}



