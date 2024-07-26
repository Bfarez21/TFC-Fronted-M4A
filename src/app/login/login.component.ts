import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 
  constructor(public auth: AuthService, private router: Router){ }

  ngOnInit(): void{ 
    this.auth.isAuthenticated$.subscribe(isAuthenticaed =>{
      if(isAuthenticaed){
          this.router.navigate(['/side-bar'])
      }
    })
  }

  login(){
    this.auth.loginWithRedirect()
  }

}
