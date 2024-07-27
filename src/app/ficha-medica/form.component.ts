import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { FichaMedica } from "./modelo/ficha-medica";
import { DiscapacidadService } from "./servicio/discapacidad.service";
import { PacienteService } from "./servicio/paciente.service";
import { FichaMedicaService } from "./servicio/ficha-medica.service";
import { AntecedenteFamiliarService } from "./servicio/antecedente-familiar.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  fichaMedica: FichaMedica = new FichaMedica();
  editMode: boolean = false;

  constructor(
    private fichaMedicaService: FichaMedicaService,
    private discapacidadService: DiscapacidadService,
    private antecedenteFamiliarService: AntecedenteFamiliarService,
    private pacienteService: PacienteService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarFicha();
  }

  cancelar(): void {
    this.router.navigate(['/ficha-medica']);
  }
// metodo cargar fichas  en el form para editar
  cargarFicha(): void {
    this.activateRouter.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.fichaMedicaService.getFichas(id).subscribe(ficha => {
          this.fichaMedica = ficha;
          this.editMode = true; // Deshabilitar el modo de edición
        });
      }
    });
  }

 

  public create(): void {
    // en caso de ser docente
    if (this.fichaMedica.paciente.profesionPac === 'Docente') {
      this.fichaMedica.paciente.carreraPac = 'NoAplica';
      this.fichaMedica.paciente.cicloPac = 'NoAplica';
    }
    this.pacienteService.create(this.fichaMedica.paciente).subscribe(paciente => {
      this.discapacidadService.create(this.fichaMedica.discapacidad).subscribe(discapacidad => {
        this.antecedenteFamiliarService.create(this.fichaMedica.antecedenteFamiliar).subscribe(antecedente => {
          this.fichaMedica.paciente = paciente;
          this.fichaMedica.discapacidad = discapacidad;
          this.fichaMedica.antecedenteFamiliar = antecedente;

          this.fichaMedicaService.create(this.fichaMedica).subscribe(fichaMedica => {
            Swal.fire('Ficha médica guardada', `Ficha médica del paciente ${this.fichaMedica.paciente.nombrePac} guardada con éxito`, 'success');
            this.router.navigate(['/ficha-medica']);
          }, error => {
            Swal.fire('Error', 'Hubo un problema al guardar la ficha médica', 'error');
          });
        }, error => {
          Swal.fire('Error', 'Hubo un problema al guardar el antecedente familiar', 'error');
        });
      }, error => {
        Swal.fire('Error', 'Hubo un problema al guardar la discapacidad', 'error');
      });
    }, error => {
      Swal.fire('Error', 'Hubo un problema al guardar el paciente', 'error');
    });
  }

 
}
