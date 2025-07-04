import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from '../doctor/doctor.service';
import { Doctor } from '../doctor/doctor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedula: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private doctorService: DoctorService, private router: Router) {}

  login(): void {
    if (!this.cedula || !this.password) {
      Swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor ingrese cédula y contraseña',
        icon: 'warning',
        confirmButtonColor: '#3b82f6',
        background: '#ffffff',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });
      return;
    }

    this.isLoading = true;

    this.doctorService.login(this.cedula, this.password).subscribe({
      next: (doctor) => {
        this.isLoading = false;
        if (doctor) {
          // ✅ Guardar doctor logueado en el localStorage
          localStorage.setItem('doctorLogueado', JSON.stringify(doctor));
          
          Swal.fire({
            title: 'Acceso Autorizado',
            text: `Bienvenido Dr. ${doctor.nombreDoc}`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            confirmButtonColor: '#3b82f6',
            background: '#ffffff',
            customClass: {
              popup: 'animated fadeInUp'
            }
          });
          
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        }
      },
      error: err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Acceso Denegado',
          text: 'Credenciales incorrectas. Contacte al administrador del sistema.',
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: '#ffffff',
          customClass: {
            popup: 'animated shake'
          }
        });
      }
    });
  }
}