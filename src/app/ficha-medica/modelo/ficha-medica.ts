import { AntecedenteFamiliar } from "./antecedente-familiar";
import { Discapacidad } from "./discapacidad";
import { Paciente } from "./paciente";

export class FichaMedica {
    idFic:number=0;
    paciente: Paciente = new Paciente();
    discapacidad: Discapacidad = new Discapacidad();
    antecedenteFamiliar: AntecedenteFamiliar = new AntecedenteFamiliar();
    fechaElaboracionFic: Date = new Date();
    
}
