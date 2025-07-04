import { Component, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Doctor } from '../doctor/doctor';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterViewInit {
  doctorLogueado: Doctor | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    const hamBurger = document.querySelector(".toggle-btn");
    if (hamBurger) {
      hamBurger.addEventListener("click", () => {
        const sidebar = document.querySelector("#sidebar");
        if (sidebar) {
          sidebar.classList.toggle("expand");
        }
      });
    }
  }

  ngOnInit(): void {
    this.doctorLogueado = this.authService.getDoctorSession();
  }

  onLogout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
