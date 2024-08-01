import { AtencionMedica } from "./atencion-medica";

export class ExamenComplementario {
    idExa: number = 0;
    tituloExa: string = "";
    aplicaExa: boolean = false;
    atencionMedica: AtencionMedica = new AtencionMedica();
    archivoPdf: File | null = null;  // Añadido para manejar el archivo PDF
}
