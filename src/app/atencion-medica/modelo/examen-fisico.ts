import { AtencionMedica } from "./atencion-medica";

export class ExamenFisico {
    idExa: number = 0;
    nombreExa: string = "";
    numeroExa: number = 0;
    descripcionExa: string = "";
    atencionMedica: AtencionMedica = new AtencionMedica();
}
