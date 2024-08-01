import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instituto } from './Instituto';
import { Titulo } from './Titulo';
import { SettingService } from './setting.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';  // Asegúrate de importar NgForm desde @angular/forms


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
  institutosSeleccionado: Instituto | null = null; // Para almacenar el instituto seleccionado


  titulo: Titulo = new Titulo(); // Añade esta línea para el nuevo título


  constructor(private settingService: SettingService, private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.institutos = this.settingService.getFormData() || new Instituto();
    this.selectedFile = this.settingService.getSelectedFile();
    this.buttonLabel = this.settingService.getButtonLabel();
    this.loadInstitutos(); // Cargar los institutos al inicializar
  }
  loadInstitutos() {
    this.settingService.getInstitutos().subscribe(
      (data: Instituto[]) => {  // Asegúrate de que el tipo sea Instituto[]
        this.institutos2 = data;
      },
      (error) => {
        console.error('Error al cargar institutos', error);
      }
    );
  }
  

  createTitulo(tituloForm: NgForm) {
    if (tituloForm.valid) {
      if (!this.titulo.contenidoTit || !this.titulo.leyendaTit || !this.titulo.instituto) {
        Swal.fire('Error', 'Todos los campos deben estar completos.', 'error');
        return;
      }

      this.settingService.createTit(this.titulo).subscribe(
        response => {
          console.log('Título creado:', response);
          Swal.fire('Éxito', 'El título ha sido creado exitosamente.', 'success');
          this.resetForm(tituloForm);
        },
        error => {
          console.error('Error al crear título:', error);
          Swal.fire('Error', 'No se pudo crear el título. Verifique los detalles.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'El formulario no es válido. Verifique los campos.', 'error');
    }
  }

  resetForm(tituloForm: NgForm) {
    tituloForm.resetForm();
    this.titulo = this.initializeTitulo();
    this.institutosSeleccionado = null; // Limpiar el instituto seleccionado
  }

  private initializeTitulo(): Titulo {
    return {
      idTit: 0,
      contenidoTit: '',
      fechaCreacion: '',
      leyendaTit: '',
      instituto: new Instituto()
    };
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
          this.settingService.setButtonLabel('Crear nuevo Instituto');
          this.buttonLabel = 'Crear nuevo Instituto';
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
        text: 'Al crear una nueva configuración se eliminará la configuración actual del instituto. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Crear nuevo Instituto',
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

  applyInstituto(inst: Instituto): void {
    this.institutos = inst;
    this.selectedFile = null;
    this.settingService.setFormData(inst);
    this.settingService.setSelectedFile(null);
    this.settingService.setButtonLabel('Guardar');
    this.buttonLabel = 'Guardar';
  }

  verDetallesImg(id: number): void {
    this.settingService.getInstitutoImage(id).subscribe(
      (imageBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          const imageUrl = this.sanitizer.bypassSecurityTrustUrl(base64data);

          Swal.fire({
            title: 'Imagen predeterminada',
            html: `
             
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

  verImagenCargada(): void {
    const storedFile = this.settingService.getSelectedFile();
    if (storedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;

        Swal.fire({
          title: 'Logo Predeterminado',
          html: `<img src="${base64data}" alt="Imagen del Instituto" style="width:100%;max-width:400px;height:auto;margin-top:10px;">`,
          showCloseButton: true,
          confirmButtonText: 'Cerrar'
        });
      };
      reader.readAsDataURL(storedFile);
    } else {
      Swal.fire('Error', 'No hay existe logo predeterminado.', 'error');
    }
  }

  
  updateInstituto(): void {
    if (!this.institutos.idIns) {
      Swal.fire('Error', 'ID del instituto no está disponible.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('nombreIns', this.institutos.nombreIns || '');
    formData.append('direccionIns', this.institutos.direccionIns || '');
    formData.append('rectorIns', this.institutos.rectorIns || '');
    if (this.selectedFile) {
      formData.append('imageInstituto', this.selectedFile);
    }

    this.settingService.updateIns(this.institutos.idIns, formData).subscribe(
      response => {
        Swal.fire('Éxito', 'Instituto actualizado exitosamente.', 'success');
        // Actualizar el estado del instituto en el servicio para reflejar los cambios
        this.settingService.setFormData(this.institutos);
        if (this.selectedFile) {
          this.settingService.setSelectedFile(this.selectedFile);
        }
      },
      error => {
        console.error('Error al actualizar instituto:', error);
        Swal.fire('Error', 'No se pudo actualizar el instituto.', 'error');
      }
    );
  }

  editNombre(): void {
    const newName = prompt('Ingrese el nuevo nombre del instituto:', this.institutos.nombreIns);
    if (newName !== null) {
      this.institutos.nombreIns = newName;
      this.settingService.setFormData(this.institutos); // Actualizar el estado en el servicio
      this.updateInstituto();
    }
  }

  editDireccion(): void {
    const newDireccion = prompt('Ingrese la nueva dirección del instituto:', this.institutos.direccionIns);
    if (newDireccion !== null) {
      this.institutos.direccionIns = newDireccion;
      this.settingService.setFormData(this.institutos); // Actualizar el estado en el servicio
      this.updateInstituto();
    }
  }

  editRector(): void {
    const newRector = prompt('Ingrese el nuevo nombre del rector:', this.institutos.rectorIns);
    if (newRector !== null) {
      this.institutos.rectorIns = newRector;
      this.settingService.setFormData(this.institutos); // Actualizar el estado en el servicio
      this.updateInstituto();
    }
  }

  editImage(): void {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.onchange = (event: any) => {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
        this.settingService.setSelectedFile(this.selectedFile); // Actualizar el estado en el servicio
        this.updateInstituto();
      }
    };
    inputFile.click();
  }

 
  }


