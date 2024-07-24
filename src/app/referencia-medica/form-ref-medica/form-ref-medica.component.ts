import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReferenciaMedicaService } from '../referencia-medica.service';
import Swal from 'sweetalert2';

import { Doctor } from '../../doctor/doctor';
import { ReferenciaMedica } from '../referencia-medica';
import { Diagnostico } from '../diagnostico/diagnostico';
import { Enfermedades } from '../../enfermedades/Enfermedades';
import { EnfermedadesService } from '../../enfermedades/enfermedades.service';

@Component({
  selector: 'app-form-ref-medica',
  templateUrl: './form-ref-medica.component.html',
  styleUrls: ['./form-ref-medica.component.css']
})
export class FormRefMedicaComponent implements OnInit {

  public referencia: ReferenciaMedica = new ReferenciaMedica()
  public enfermedades: Enfermedades[] = [];
  editMode: boolean = false;

  constructor(
    private referenciaService: ReferenciaMedicaService,
    private enfermedadesService: EnfermedadesService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }


  cancelar() {
    this.router.navigate(['/referencia-medica']);
  }

  public create(): void {
    console.log('Referencia a enviar:', this.referencia);
    this.referenciaService.create(this.referencia)
      .subscribe({
        next: referencia => {
          this.router.navigate(['/referencia-medica']);
          Swal.fire('Referencia Médica guardada', `Referencia Médica ${this.referencia.departamento_ref} guardada con éxito`, 'success');
          this.editMode = false;
        },
        error: error => {
          console.error('Error al guardar la referencia médica:', error);
          Swal.fire('Error', 'Hubo un problema al guardar la referencia médica.', 'error');
        }
      });
  }
  addDiagnostico() {
    this.referencia.diagnosticos.push(new Diagnostico());
  }

  eliminarDiagnostico(index: number) {
    this.referencia.diagnosticos.splice(index, 1);
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
    this.enfermedadesService.getEnfermedades().subscribe(enfermedades => this.enfermedades = enfermedades);
  }

  ngOnInit(): void {
    this.cargarReferencia();
    this.cargarEnfermedades();
  }
  
}
