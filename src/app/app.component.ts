import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //isAuthenticated: boolean = false;
  isAuthenticated: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    // Redirige en función del estado manual
    if (this.isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /*constructor(public auth: AuthService, private router: Router,
    @Inject(DOCUMENT) private document: Document

  ) { }

  ngOnInit() {
    //Autenticación exitosa
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });

    //Errore de autenticación
    this.auth.error$.subscribe(
      (error) => {
        console.log('Error recibido:', error);
        if (error && error.message) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error'
          }).then(() => {
            this.auth.logout({
              logoutParams: {
                returnTo: this.document.location.origin
              }
            }).subscribe(() => {
              this.router.navigate(['/login']);
            });
          });
        } else {
          Swal.fire({
            title: 'Error desconocido',
            text: 'Ocurrió un error inesperado.',
            icon: 'error'
          });
        }
      }
    );
  }*/

}
