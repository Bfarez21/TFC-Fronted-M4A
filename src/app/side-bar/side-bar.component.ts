import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements AfterViewInit {

    constructor(private authService: AuthService){}
    

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
      this.authService.logout();
    }
}


