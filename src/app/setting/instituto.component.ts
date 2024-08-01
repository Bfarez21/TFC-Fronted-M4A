import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instituto } from './Instituto';
import { SettingService } from './setting.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrls: ['./instituto.component.css']
})
export class InstitutoComponent implements OnInit {

  instituto: Instituto[] = [];
  codigoBuscar: string = '';
  institutoEncontrado: Instituto | null = null;

  constructor(private settingService: SettingService, private router: Router,
    private sanitizer: DomSanitizer) {}

  cancelar() {
    this.router.navigate(['/setting']);
  }

  ngOnInit(): void {
    this.cargarInstituto();
  }

  cargarInstituto(): void {
    this.settingService.getInstitutos().subscribe(institutos => {
      this.instituto = institutos;
      this.institutoEncontrado=null;
    });
  }

  verDetalles(id: number): void {
    this.settingService.getInstitutoImage(id).subscribe(
      (imageBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          Swal.fire({
            title: 'Logo del Instituto',
            html: `
              <img src="${base64data}" alt="Logo del Instituto" style="width:100%;max-width:400px;height:auto;margin-top:10px;">
            `,
            showCloseButton: true,
            confirmButtonText: 'Cerrar'
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

    const codigoIns = Number(this.codigoBuscar);
    this.settingService.buscarPorCodigo(codigoIns).subscribe(
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

  deleteInstitutos(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingService.deleteInstituto(id).subscribe(
          response => {
            // Si se eliminó correctamente
            this.instituto = this.instituto.filter(instituto => instituto.idIns !== id);
            Swal.fire('Eliminado!', 'Tu registro ha sido eliminado.', 'success');
            this.limpiarFormulario();
          },
          error => {
            // Manejo de error específico para cuando no se puede eliminar
            if (error.status === 403) { // Código de estado para prohibido (según la respuesta del backend)
              Swal.fire({
                title: 'Error',
                text: 'No se puede eliminar el instituto porque tiene títulos asociados.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al eliminar el instituto.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        );
      }
    });
  }


  limpiarFormulario(): void {
    this.institutoEncontrado = null;
    this.settingService.setFormData(null);
    this.settingService.setSelectedFile(null);
   
  }
  aplicarConfiguracion(inst: Instituto): void {
    this.settingService.getInstitutoImage(inst.idIns).subscribe(
      (imageBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;

          Swal.fire({
            title: 'Aplicar',
            text: '¿Estás seguro de que deseas aplicar este instituto como predeterminado?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, aplicar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.settingService.setFormData(inst);
              this.settingService.setSelectedFile(new File([imageBlob], 'institutoImage', { type: imageBlob.type }));
              
              Swal.fire('Aplicado!', 'La configuración ha sido aplicada. Revisa el apartado de Ajustes', 'success');
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
}
