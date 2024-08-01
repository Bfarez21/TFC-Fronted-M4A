import { AtencionMedica } from "../atencion-medica/modelo/atencion-medica";
import { Doctor } from "../doctor/doctor";
import { FichaMedica } from "../ficha-medica/modelo/ficha-medica";
import { Diagnostico } from "./diagnostico/diagnostico";


export class ReferenciaMedica {
    id_ref?: number;
    institucion_ref?: string;
    cedula_doc_ref?: string;
    servicio_ref?: string;
    entidad_sistema_ref?: string;
    establecimiento_ref?: string;
    servicio_refe_ref?: string;
    especialidad_ref?: string;
    fecha_ref?: string;
    motivo_limitada_ref?: boolean;
    motivo_falta_ref?: boolean;
    motivo_otros_ref?: boolean;
    resumen_ref?: string;
    hallazgos_ref?: string;
    nombre_doc_ref?: string;
    codigo_msp_ref?: string;
    fk_id_atencion_medica?: number;
    atencionMedica?: AtencionMedica; // Referencia a la entidad AtencionMedica

    //Variables adicionales utiles
    diagnosticos: Diagnostico[] = []; 

}
