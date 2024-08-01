import { Component, OnInit } from '@angular/core';
import { PacienteService } from './servicio/paciente.service';
import { FichaMedicaService } from './servicio/ficha-medica.service';
import { Paciente } from './modelo/paciente';
import { FichaMedica } from './modelo/ficha-medica';
import Swal from 'sweetalert2';
import { DiscapacidadService } from './servicio/discapacidad.service';
import { AntecedenteFamiliarService } from './servicio/antecedente-familiar.service';
@Component({
  selector: 'app-ficha-medica',
  templateUrl: './index-ficha-medica.component.html',
  styleUrl: './ficha-medica.component.css'
})
export class FichaMedicaComponent /*implements OnInit */ {
  fichaMedica: FichaMedica[] = []; // Asegúrate de inicializar pacientes como un arreglo vacío
  cedulaBusqueda: string = '';
  apellidoBusqueda: string='';
  profesionBusqueda: string = '';
  fichaMedicaEncontrada:FichaMedica | null=null;

  constructor(private fichaMedicaService: FichaMedicaService,private pacienteService:PacienteService) { }

  ngOnInit(): void {
    this.cargarFichaMedica(); // Llama a cargarPacientes()
  }

  cargarFichaMedica(): void {
    this.fichaMedicaService.getFichasMedicas().subscribe(fichaMedica => {
      fichaMedica = this.fichaMedica = fichaMedica; // Asigna los pacientes obtenidos del servicio a la propiedad del componente
    });
  }

  /// BOTON VER
  // uso Sweetalert para mostrar datos de un registro y asigno en el boton ver
  verDetalle(fichaMedica: FichaMedica): void {
    Swal.fire({
      title: `${fichaMedica.paciente.nombrePac} ${fichaMedica.paciente.apellidoPac}`,
      html: `
      <div style="display: flex; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px; padding-right: 10px;">
          <p><strong>Fecha Registro:</strong>${fichaMedica.fechaElaboracionFic} </p>
          <p><strong>Cédula:</strong> ${fichaMedica.paciente.cedulaPac}</p>
          <p><strong>Rol:</strong> ${fichaMedica.paciente.profesionPac}</p>
          <p><strong>Fecha Nacimiento:</strong>${fichaMedica.paciente.fechaNacimientoPac} </p>
          <p><strong>Lugar:</strong>${fichaMedica.paciente.lugarPac} </p>
          <p><strong>Pais:</strong>${fichaMedica.paciente.paisPac} </p>
          <p><strong>Dirección:</strong>${fichaMedica.paciente.direccionPac} </p>
          <p><strong>Barrio:</strong>${fichaMedica.paciente.barrioPac} </p>
          <p><strong>Parroquia:</strong>${fichaMedica.paciente.parroquiaPac} </p>
          <p><strong>Cantón:</strong>${fichaMedica.paciente.cantonPac} </p>
          <p><strong>Provincia:</strong>${fichaMedica.paciente.provinciaPac} </p>
          <p><strong>Teléfono:</strong>${fichaMedica.paciente.telefonoPac} </p>
          <p><strong>Género:</strong>${fichaMedica.paciente.generoPac} </p>
          <p><strong>Estado Civil:</strong>${fichaMedica.paciente.estadoCivilPac} </p>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <p><strong>Tipo Sangre:</strong>${fichaMedica.paciente.tipoSangrePac} </p>
          <p><strong>Carrera:</strong>${fichaMedica.paciente.carreraPac} </p>
          <p><strong>Ciclo:</strong>${fichaMedica.paciente.cicloPac} </p>
          <p><strong>Discapacidad:</strong>${fichaMedica.discapacidad.discapacidadG} </p>
          <p><strong>Tipo:</strong>${fichaMedica.discapacidad.subtipoDis} </p>
          <p><strong>Porcentaje:</strong>${fichaMedica.discapacidad.porcentajeDis} </p>
          <p><strong>Carnet CONADIS:</strong>${fichaMedica.discapacidad.carnetCon} </p> 
          <p><strong>Numero CONADIS:</strong>${fichaMedica.discapacidad.numeroConadis} </p>   
          <p><strong>Antecedentes:</strong> </p>
          <p><strong>Alérgia:</strong>${fichaMedica.antecedenteFamiliar.alergiaAnt} </p>
          <p><strong>Clínico:</strong>${fichaMedica.antecedenteFamiliar.clinicoAnt} </p>
          <p><strong>Ginecológico:</strong>${fichaMedica.antecedenteFamiliar.ginecologoAnt} </p>
          <p><strong>Traumatológico:</strong>${fichaMedica.antecedenteFamiliar.traumatologicoAnt} </p>
          <p><strong>Quirúrgico:</strong>${fichaMedica.antecedenteFamiliar.quirurgicoAnt} </p>
          <p><strong>Farmacológico:</strong>${fichaMedica.antecedenteFamiliar.farmacologicoAnt} </p>
        </div>
      </div>  
      `,
    });
  }
  //BOTON BUSCAR CEDULA/APELLIDO/CARRERA
  buscarCedu(): void {
    if (this.cedulaBusqueda) {
      this.pacienteService.buscarPorCedula(this.cedulaBusqueda).subscribe(
        paciente => {
          if (paciente) {
            this.fichaMedicaService.getFichasMedicas().subscribe(fichaMedica => {
              this.fichaMedicaEncontrada = fichaMedica.find(ficha => ficha.paciente.cedulaPac === paciente.cedulaPac) || null;
            });
          } else {
            this.fichaMedicaEncontrada = null;
          }
        },
        error => {
          console.error('Error al buscar el paciente:', error);
          this.fichaMedicaEncontrada = null;
        }
      );
    } else if (this.apellidoBusqueda) {
      // Implementar búsqueda por apellido
      this.fichaMedicaService.getFichasMedicas().subscribe(fichaMedica => {
        this.fichaMedicaEncontrada = fichaMedica.find(ficha => ficha.paciente.apellidoPac.toLowerCase().includes(this.apellidoBusqueda.toLowerCase())) || null;
      });
    } else if (this.profesionBusqueda) {
      // Implementar búsqueda por rol
      this.fichaMedicaService.getFichasMedicas().subscribe(fichaMedica => {
        this.fichaMedicaEncontrada = fichaMedica.find(ficha => ficha.paciente.profesionPac.toLowerCase().includes(this.profesionBusqueda.toLowerCase())) || null;
      });
    }
  }
 
  recargarTabla(): void {
    this.fichaMedicaEncontrada  = null;
    this.cargarFichaMedica();
    this.cedulaBusqueda = ''; // Limpia el campo 
  }
  /// BOTON ELIMINAR
  //eliminar datos de la base
  deleteFicha(): void {

  }

}


