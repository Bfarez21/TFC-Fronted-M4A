import { Doctor } from "../../doctor/doctor";
import { FichaMedica } from "../../ficha-medica/modelo/ficha-medica";
import { AtencionSigno } from "./atencion-signo";
import { Diagnostico } from "./diagnostico";
import { ExamenComplementario } from "./examen-complementario";

export class AtencionMedica {
    idAte: number = 0;
    motivoAte: string = "";
    enfermedadActualAte: string = "";
    tratamientoAte: string = "";
    fichaMedica: FichaMedica = new FichaMedica();
    doctor: Doctor = new Doctor();
    diagnosticos: Diagnostico[] = [];
    examenescomplementarios: ExamenComplementario[] = [];
    fechaAtencionAte: Date = new Date();
    atencionesSignos: AtencionSigno[] = [];
}
