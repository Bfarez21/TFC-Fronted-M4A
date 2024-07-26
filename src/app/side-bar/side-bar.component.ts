import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements AfterViewInit {

    constructor(public auth: AuthService){}
    

    ngAfterViewInit(): void {
      const hamBurger = document.querySelector(".toggle-btn");
  
      if (hamBurger) {
        hamBurger.addEventListener("click", function () {
          const sidebar = document.querySelector("#sidebar");
          if (sidebar) {
            sidebar.classList.toggle("expand");
          }
        });
      }
    }
    onLogout() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.auth.logout();
        }
      });
    }
}


