import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-form',
    templateUrl: './formdoc.component.html',
    styleUrl: './formdoc.component.css'
})

export class FormDocComponent{
    constructor(private router:Router){}

    // metodo regresar ventana anterior
    cancelar(){
        this.router.navigate(['/doctor'])
    }
}