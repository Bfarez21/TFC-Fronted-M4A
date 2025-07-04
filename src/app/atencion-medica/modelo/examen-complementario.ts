import { AtencionMedica } from "./atencion-medica";

export class ExamenComplementario {
    idExa: number = 0;
    tituloExa: string = "";
    aplicaExa: boolean = false;
    atencionMedica: AtencionMedica = new AtencionMedica();
     // Para el archivo binario (no se serializa)
    archivoPdf?: any; // byte[] en backend
    
    // Campos adicionales para manejo de archivos
    nombreArchivo?: string;
    tipoContenido?: string;
    tamañoArchivo?: number;
    
    // Campo temporal para el archivo seleccionado (solo frontend)
    archivoPdfFile?: File;
}
