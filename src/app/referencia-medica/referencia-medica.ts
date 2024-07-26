import { AtencionMedica } from "../atencion-medica/modelo/atencion-medica";
import { Doctor } from "../doctor/doctor";
import { FichaMedica } from "../ficha-medica/modelo/ficha-medica";
import { Diagnostico } from "./diagnostico/diagnostico";


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
    diagnosticos: Diagnostico[] = [];
    atencionMedica: AtencionMedica = new AtencionMedica();
    fichaMedica: FichaMedica = new FichaMedica();
    // idRef: number = 0;
    // institucionRef: string = "";
    // departamentoRef: string = "";
    // entidadSistemaRef: string = "";
    // establecimientoRef: string = "";
    // servicioRef: string = "";
    // especialidadRef: string = "";
    // fechaRef:string="";
    // motivoRef: string = "";
    // resumenRef: string = "";
    // hallazgosRef: string = "";
    // diagnosticos: Diagnostico[] = [];
    // atencionMedica: AtencionMedica = new AtencionMedica();
    // fichaMedica: FichaMedica = new FichaMedica();
}
