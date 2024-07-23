import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enfermedades } from './Enfermedades';
import { EnfermedadesService } from './enfermedades.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']  
  
})
export class EnfermedadesComponent {

  enfermedades: Enfermedades[] =[] ;
  codigoBuscar: string ='';
  codigoEncontrado: Enfermedades | null = null;
  constructor(private enfermedadesService: EnfermedadesService) {}

  ngOnInit(): void{
    this.cargarEnfermedad();
  }

  cargarEnfermedad(): void {
    this.enfermedadesService.getEnfermedades().subscribe(enfermedades => {
      enfermedades = this.enfermedades=enfermedades; // Asigna los doctores obtenidos del servicio a la propiedad del componente
    });
  }

  //boton eliminar
  deleteEnfermedades(id: number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.enfermedadesService.deleteEnfermedad(id).subscribe(response => {
          this.enfermedades=this.enfermedades.filter(Enfermedades=>Enfermedades.idEnf !==id);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success'
          });
        });
      }
    });
  }

 

  verDetalles(enfermedades: Enfermedades): void {
    Swal.fire({
      title: `${enfermedades.codigoEnf} ${enfermedades.nombreEnf}`,
      html: `
        <p><strong>id:</strong> ${enfermedades.idEnf}</p>
        <p><strong>Codigo:</strong> ${enfermedades.codigoEnf}</p>
        <p><strong>Nombre enf:</strong> ${enfermedades.nombreEnf}</p>
        <p><strong>Tipo enfer:</strong> ${enfermedades.tipoEnf}</p>
        <p><strong>Sintomas:</strong> ${enfermedades.sintomasEnf}</p>
        <p><strong>Descripciòn:</strong> ${enfermedades.descripcionEnf}</p>
      `,
    });
  }

  // BOTON BUSCAR 
  buscar(): void {
    if (this.codigoBuscar) {
      this.enfermedadesService.buscarPorCodigo(this.codigoBuscar).subscribe(
        enfermedades => {
          this.codigoEncontrado = enfermedades;
        },
        error => {
          console.error('Error al buscar la enfermedad:', error);
          this.codigoEncontrado = null;
        }
      );
    }
  }
}