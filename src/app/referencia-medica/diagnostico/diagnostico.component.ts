import { Component, OnInit } from '@angular/core';
import { Diagnostico } from './diagnostico';
import { DiagnosticoService } from './diagnostico.service';
import { ReferenciaMedicaService } from '../referencia-medica.service';
import { catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';;

@Component({
  selector: 'app-diagnostico',
  template:'',
  styles: ['']
})
export class DiagnosticoComponent implements OnInit {
  diagnostico: Diagnostico = new Diagnostico();
  diagnosticos$: Observable<Diagnostico[]> = of([]);
  error: string = '';

  constructor(
    private diagnosticoService: DiagnosticoService,
    private referenciaMedicaService: ReferenciaMedicaService
  ) {}

  ngOnInit(): void {
    //this.loadDiagnosticos();
  }

  // loadDiagnosticos(): void {
  //   this.diagnosticos$ = this.diagnosticoService.getDiagnosticos().pipe(
  //     catchError(error => {
  //       this.error = 'Error al cargar diagnósticos';
  //       console.error(error);
  //       return of([]);
  //     })
  //   );
  // }

  // createDiagnostico(): void {
  //   if (this.diagnostico) {
  //     this.diagnosticoService.create(this.diagnostico).subscribe(
  //       (newDiagnostico) => {
  //         console.log('Diagnóstico creado:', newDiagnostico);
  //         //this.loadDiagnosticos(); // Recargar la lista después de la creación
  //       },
  //       (error) => {
  //         this.error = 'Error al crear diagnóstico';
  //         console.error(error);
  //       }
  //     );
  //   }
  // }

  deleteDiagnostico(id: number): void {
    this.diagnosticoService.deleteDiagnostico(id).subscribe(
      () => {
        console.log('Diagnóstico eliminado');
        //this.loadDiagnosticos(); // Recargar la lista después de la eliminación
      },
      (error) => {
        this.error = 'Error al eliminar diagnóstico';
        console.error(error);
      }
    );
  }
}
