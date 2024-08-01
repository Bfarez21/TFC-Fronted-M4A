import { FichaMedica } from "../ficha-medica/modelo/ficha-medica";

export class AtencMed {

    idAte:number=0;
	motivoAte:string="";
    tratamientoAte:string="";
    fechaAtencionAte:string="";
    enfermedadActualAte: string="";
    fichaMedica: FichaMedica = new FichaMedica();
}