import { Doctor } from "../../doctor/doctor";
import { FichaMedica } from "../../ficha-medica/modelo/ficha-medica";
import { AtencionSigno } from "./atencion-signo";
import { Diagnostico } from "./diagnostico";
import { ExamenComplementario } from "./examen-complementario";
import { ExamenFisico } from "./examen-fisico";

    export class AtencionMedica {
        idAte: number = 0;
        motivoAte: string = "";
        enfermedadActualAte: string = "";
        tratamientoAte: string = "";
        fichaMedica: FichaMedica = new FichaMedica();
        doctor: Doctor = new Doctor();
        diagnosticos: Diagnostico[] = [];
        examenesComplementarios: ExamenComplementario[] = [];
        examenesFisicos: ExamenFisico[] = [];
        fechaAtencionAte: Date = new Date();
        atencionesSignos: AtencionSigno[] = [];
    }
