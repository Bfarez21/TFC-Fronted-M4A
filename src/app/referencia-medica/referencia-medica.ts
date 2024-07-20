import { Doctor } from "../doctor/doctor";
import { Diagnostico } from "./diagnostico";

export class ReferenciaMedica {
    id_ref: number = 0;
    institucion_ref: string = "";
    departamento_ref: string = "";
    entidad_sistema_ref: string = "";
    establecimiento_ref: string = "";
    servicio_ref: string = "";
    especialidad_ref: string = "";
    fecha_ref:string="";
    motivo_referencia_ref: string = "";
    resumen_ref: string = "";
    hallazgos_ref: string = "";
    fk_diagnostico_ref:number=0;
    fk_id_atencion_medica:number=0;
    diagnosticos: Diagnostico[] = [];
}
