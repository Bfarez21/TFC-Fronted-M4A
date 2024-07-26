import { Doctor } from "../../doctor/doctor";
import { FichaMedica } from "../../ficha-medica/modelo/ficha-medica";
import { Diagnostico } from "../../referencia-medica/diagnostico/diagnostico";
import { Instituto } from "../../setting/Instituto";

export class AtencionMedica {
    idAte: number = 0;
    motivoAte: string = "";
    enfermedadActualAte: string = "";
    tratamientoAte: string = "";
    fichaMedica: FichaMedica = new FichaMedica();
    doctor: Doctor = new Doctor();
    instituto: Instituto = new Instituto();
    diagnostico: Diagnostico[] = [];
    fechaAtencionAte: Date = new Date();

}
