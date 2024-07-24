import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Instituto } from './Instituto';
import { SettingService } from './setting.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit{
//
  formData: any = {}
  selectedFile: File | null = null;//
  editMode: boolean= false;
    public institutos:Instituto = new Instituto()
  constructor(private settingService:SettingService, private router:Router,
    private activateRouter:ActivatedRoute){}
   
    
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  createInstituto() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nombreIns', this.institutos.nombreIns);
      formData.append('direccionIns', this.institutos.direccionIns);
      formData.append('rectorIns', this.institutos.rectorIns);
      formData.append('imageInstituto', this.selectedFile);

      this.settingService.createIns(formData).subscribe(
        response => {
          Swal.fire('Éxito', 'Instituto registrado exitosamente.', 'success');
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
  ngOnInit(): void {
  }
}
