import { Enfermedades } from "../../enfermedades/Enfermedades";
import { ReferenciaMedica } from "../referencia-medica";

export class Diagnostico {
  id_dia?: number;
  enfermedad?: Enfermedades;
  referencia?: Partial<ReferenciaMedica>; // Usa Partial para aceptar solo partes de ReferenciaMedica
  diagnostico_dia?: string;
  codigo_dia?: string;
  estado_dia?: boolean;
  //Variables adicionales para manejar el formulario.
  searchTerm: string = '';
  //codigoEnfermedad?: string;
  //referencia?: ReferenciaMedica;
}
