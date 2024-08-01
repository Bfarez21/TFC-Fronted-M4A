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
   ver():void{
    this.cargarEnfermedad();
    this.codigoEncontrado=null;
   }
  cargarEnfermedad(): void {
    this.enfermedadesService.getEnfermedades().subscribe(enfermedades => {
      enfermedades = this.enfermedades=enfermedades; // Asigna los doctores obtenidos del servicio a la propiedad del componente
    });
  }

  //boton eliminar
  deleteEnfermedades(id: number):void{
    Swal.fire({
      title: 'Estas segur@?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.enfermedadesService.deleteEnfermedad(id).subscribe(response => {
          this.enfermedades=this.enfermedades.filter(Enfermedades=>Enfermedades.idEnf !==id);
          Swal.fire({
            title: ' Eliminado!',
            text: 'Tu registro ha sido eliminado.',
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

  // Botón buscar
  buscar(): void {
    if (!this.codigoBuscar.trim()) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor, ingrese el código de enfermedad a buscar.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        position: 'center'
      }).then(() => {
        setTimeout(() => {
          const inputElement = document.getElementById('codigo') as HTMLInputElement;
          if (inputElement) {
            inputElement.focus();
          }
        }, 100);
      });
      return;
    }

    this.enfermedadesService.buscarPorCodigo(this.codigoBuscar).subscribe(
      (result: Enfermedades | null) => {
        if (result === null) {
          Swal.fire({
            title: 'No Encontrado',
            text: 'No existe el registro en la base de datos.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            position: 'center'
          });
        } else {
          this.codigoEncontrado = result;
        }
      },
      error => {
        console.error('Error al buscar la enfermedad:', error);
        this.codigoEncontrado = null;
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al buscar la enfermedad.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          position: 'center'
        });
      }
    );
  }
}



