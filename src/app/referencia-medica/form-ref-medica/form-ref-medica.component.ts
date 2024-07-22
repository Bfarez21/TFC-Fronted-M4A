import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferenciaMedicaService } from '../referencia-medica.service';
import Swal from 'sweetalert2';
import { Diagnostico } from '../diagnostico';
import { Doctor } from '../../doctor/doctor';
import { ReferenciaMedica } from '../referencia-medica';

@Component({
  selector: 'app-form-ref-medica',
  templateUrl: './form-ref-medica.component.html',
  styleUrls: ['./form-ref-medica.component.css']
})
export class FormRefMedicaComponent implements OnInit {

  public referencia: ReferenciaMedica = new ReferenciaMedica()


  //Datos de diagnostico

  diagnostico: Diagnostico = new Diagnostico();

  constructor(
    private referenciaService: ReferenciaMedicaService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

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
  

}
