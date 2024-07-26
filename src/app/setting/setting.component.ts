import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instituto } from './Instituto';
import { SettingService } from './setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  
  institutos2: Instituto[] = [];
  institutos: Instituto = new Instituto();
  selectedFile: File | null = null;
  buttonLabel: string = 'Guardar';

  constructor(private settingService: SettingService, private router: Router) {}

  loadInstitutos(): void {
    this.settingService.getInstitutos().subscribe(data => {
      this.institutos2 = data;
    });
  }
  ngOnInit(): void {
    this.institutos = this.settingService.getFormData() || new Instituto();
    this.selectedFile = this.settingService.getSelectedFile();
    this.buttonLabel = this.settingService.getButtonLabel();
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.settingService.setSelectedFile(this.selectedFile);
    }
  }

  createInstituto(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nombreIns', this.institutos.nombreIns);
      formData.append('direccionIns', this.institutos.direccionIns);
      formData.append('rectorIns', this.institutos.rectorIns);
      formData.append('imageInstituto', this.selectedFile);

      this.settingService.createIns(formData).subscribe(
        response => {
          Swal.fire('Éxito', 'Instituto registrado exitosamente.', 'success');
          this.settingService.setFormData(this.institutos);
          this.settingService.setSelectedFile(this.selectedFile);
          this.settingService.setButtonLabel('Crear nuevo formulario');
          this.buttonLabel = 'Crear nuevo formulario';
        },
        error => {
          console.error('Error al registrar instituto:', error);
          Swal.fire('Error', 'No se pudo registrar el instituto.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor seleccione una imagen.', 'error');
    }
  }

  onSubmit(): void {
    if (this.buttonLabel === 'Guardar') {
      this.createInstituto();
    } else {
      Swal.fire({
        title: 'Confirmación',
        text: 'Al crear una nueva configuración se eliminará la configuración actual. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Crear nuevo formulario',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.institutos = new Instituto(); // Limpiar los datos
          this.selectedFile = null; // Limpiar el archivo seleccionado
          this.settingService.setFormData(null); // Limpiar el estado del formulario en el servicio
          this.settingService.setSelectedFile(null); // Limpiar el archivo en el servicio
          this.settingService.setButtonLabel('Guardar'); // Restablecer el botón
          this.buttonLabel = 'Guardar';
        }
      });
    }
  }
}
