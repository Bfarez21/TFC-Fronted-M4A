import { AtencionMedica } from "../atencion-medica/modelo/atencion-medica";
import { Doctor } from "../doctor/doctor";
import { FichaMedica } from "../ficha-medica/modelo/ficha-medica";
import { Diagnostico } from "./diagnostico/diagnostico";


export class ReferenciaMedica {
    idRef: number = 0;
    institucionRef: string = "";
    departamentoRef: string = "";
    entidadSistemaRef: string = "";
    establecimientoRef: string = "";
    servicioRef: string = "";
    especialidadRef: string = "";
    fechaRef:string="";
    motivoRef: string = "";
    resumenRef: string = "";
    hallazgosRef: string = "";
    diagnosticos: Diagnostico[] = [];
    atencionMedica: AtencionMedica = new AtencionMedica();
    fichaMedica: FichaMedica = new FichaMedica();
}
