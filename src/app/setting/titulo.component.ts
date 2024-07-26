import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Titulo } from './Titulo';

import { SettingService } from './setting.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent implements OnInit{
  titulo: Titulo[] =[] ;
  codigoBuscar: string ='';
  tituloEncontrado: Titulo | null = null;
  constructor(private settingService: SettingService, private router: Router) {}

 cancelar(){
      this.router.navigate(['/setting'])
  }
  ngOnInit(): void {
    this.cargarTitulos();
  }

  cargarTitulos(): void {
    this.settingService.getTiitulos().subscribe(titulos => {
      titulos = this.titulo =titulos; // Asigna los doctores obtenidos del servicio a la propiedad del componente
    });
  }

   // Botón buscar
 buscar(): void {
  if (!this.codigoBuscar.trim()) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Por favor, ingrese el código de titulo a buscar.',
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

  this.settingService.buscarPorCodigoTit(this.codigoBuscar).subscribe(
    (result: Titulo | null) => {
      if (result === null) {
        Swal.fire({
          title: 'No Encontrado',
          text: 'No existe el registro en la base de datos.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
          position: 'center'
        });
      } else {
        this.tituloEncontrado = result;
      }
    },
    error => {
      console.error('Error al buscar el titulo:', error);
      this.tituloEncontrado = null;
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al buscar el titulo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        position: 'center'
      });
    }
  );
}

  //boton eliminar
  deleteTitulos(id: number):void{
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
        this.settingService.deleteInstituto(id).subscribe(response => {
          this.titulo=this.titulo.filter(titulo=>titulo.idTit!==id);
          Swal.fire({
            title: ' Eliminado!',
            text: 'Tu registro ha sido eliminado.',
            icon: 'success'
          });
        });
      }
    });
  }
}
