import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Enfermedades } from './Enfermedades';
import { EnfermedadesService } from './enfermedades.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.enfermedades.component.html',
  styleUrl: './form.enfermedades.component.css'
})

export class FormEnfermedadesComponent implements OnInit {

    editMode: boolean= false;
    public enfermedades:Enfermedades = new Enfermedades()
    
    constructor(private enfermedadesService:EnfermedadesService, private router:Router,
      private activateRouter:ActivatedRoute){}

    cancelar(){
      this.router.navigate(['/enfermedades'])
  }
  //crear enfermedades
  public create(): void{
    this.enfermedadesService.create(this.enfermedades).
    subscribe(
      enfermedades=>{this.router.navigate(['/enfermedades'])
      Swal.fire('Enfermedad Guardada',`Enfermedad ${this.enfermedades.nombreEnf} Guardado con exito`,'success')
      this.editMode= false;
    }) 
  }
  //cargar enfermedades
  cargarEnfermedad(): void{
    this.activateRouter.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.enfermedadesService.getEnfermedad(id).subscribe((enfermedades)=>this.enfermedades=enfermedades)
        this.editMode=true;
      }
    })
  }
  ngOnInit(): void {
    this.cargarEnfermedad()
  }
}