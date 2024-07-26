import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Instituto } from './Instituto';
import { SettingService } from './setting.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import Swal from "sweetalert2";


@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrl: './instituto.component.css'
})
export class InstitutoComponent implements OnInit{

  instituto: Instituto[] =[] ;
  codigoBuscar: string ='';
  institutoEncontrado: Instituto | null = null;

  constructor(private settingService:SettingService, private router:Router,
    private activateRouter:ActivatedRoute,  private sanitizer: DomSanitizer){}

  cancelar(){
    this.router.navigate(['/setting'])
}
ngOnInit(): void {
  this.cargarInstituto();
}

cargarInstituto(): void {
  this.settingService.getInstitutos().subscribe(institutos => {
    institutos = this.instituto=institutos; // Asigna los doctores obtenidos del servicio a la propiedad del componente
  });
}

verDetalles(id: number): void {
  this.settingService.getInstitutoImage(id).subscribe(
    (imageBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const imageUrl = this.sanitizer.bypassSecurityTrustUrl(base64data);

        Swal.fire({
          title: 'Detalles del Instituto',
          html: `
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Nombre:</strong> Nombre del Instituto</p> <!-- Reemplazar con datos reales -->
            <p><strong>Rector:</strong> Rector del Instituto</p> <!-- Reemplazar con datos reales -->
            <p><strong>Dirección:</strong> Dirección del Instituto</p> <!-- Reemplazar con datos reales -->
            <img id="imagePreview" src="" alt="Imagen del Instituto" style="display:none;width:100%;max-width:400px;height:auto;margin-top:10px;">
            <button id="viewImageBtn" class="swal2-confirm swal2-styled">Ver Imagen</button>
          `,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: 'Cerrar',
          didOpen: () => {
            const viewImageBtn = document.getElementById('viewImageBtn');
            const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;

            if (viewImageBtn && imagePreview) {
              viewImageBtn.addEventListener('click', () => {
                imagePreview.src = base64data;
                imagePreview.style.display = 'block';
                viewImageBtn.style.display = 'none';
              });
            }
          }
        });
      };
      reader.readAsDataURL(imageBlob);
    },
    error => {
      console.error('Error al cargar la imagen del instituto:', error);
      Swal.fire('Error', 'No se pudo cargar la imagen del instituto.', 'error');
    }
  );
}


 // Botón buscar
 buscar(): void {
  if (!this.codigoBuscar.trim()) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Por favor, ingrese el código de instituto a buscar.',
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

  this.settingService.buscarPorCodigo(this.codigoBuscar).subscribe(
    (result: Instituto | null) => {
      if (result === null) {
        Swal.fire({
          title: 'No Encontrado',
          text: 'No existe el registro en la base de datos.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
          position: 'center'
        });
      } else {
        this.institutoEncontrado = result;
      }
    },
    error => {
      console.error('Error al buscar el instituto:', error);
      this.institutoEncontrado = null;
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al buscar el instituto.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        position: 'center'
      });
    }
  );
}

  //boton eliminar
  deleteInstitutos(id: number):void{
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
          this.instituto=this.instituto.filter(instituto=>instituto.idIns!==id);
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
