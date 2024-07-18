import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Doctor } from "./doctor";
import { DoctorService } from "./doctor.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-form',
    templateUrl: './formdoc.component.html',
    styleUrl: './formdoc.component.css'
})

export class FormDocComponent implements OnInit{

    public doctor:Doctor = new Doctor()

    constructor(private doctorService:DoctorService, private router:Router,
        private activateRouter:ActivatedRoute){}

    // metodo regresar ventana anterior
    cancelar(){
        this.router.navigate(['/doctor'])
    }
    // crear doctor
    public create():void{
        this.doctorService.create(this.doctor)
        .subscribe(
           doctor=> {this.router.navigate(['/doctor'])
           Swal.fire('Doctor guardado',  `Doctor ${this.doctor.nombre_doc} guardado con exito`,'success')
           }
          )
      }

      // metodo cargar pacientes en el form
      cargarDoctor():void{
        this.activateRouter.params.subscribe(params=>{
            let id=params['id']
            if(id){
                this.doctorService.getDoctor(id).subscribe((doctor)=>this.doctor=doctor)
            }
        })
      }

        // llamo al metodo cargarDoctor cuando inicializo el form para editar
    ngOnInit(): void {
        this.cargarDoctor()
    }
}