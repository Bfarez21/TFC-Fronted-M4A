import { AtencionMedica } from "./atencion-medica";
import { SignoVital } from "./signo-vital";

export class AtencionSigno {
    idAts: number = 0;
    valorAts: number = 0.0;
    signoVital: SignoVital = new SignoVital();
}
