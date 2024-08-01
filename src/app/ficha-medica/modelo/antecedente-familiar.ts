import { Discapacidad } from "./discapacidad";
import { Paciente } from "./paciente";

export class AntecedenteFamiliar {

    idAnt: number = 0;
    alergiaAnt: Boolean = false;
    clinicoAnt: Boolean = false;
    ginecologoAnt: Boolean = false;
    traumatologicoAnt: Boolean = false;
    quirurgicoAnt: Boolean = false;
    farmacologicoAnt: Boolean = false;

    descripcionAlergiaAnt: string = '';
    descripcionClinicoAnt: string = '';
    descripcionGinecologoAnt: string = '';
    descripcionTraumatologicoAnt: string = '';
    descripcionQuirurgicoAnt: string = '';
    descripcionFarmacologicoAnt: string = '';
    
    
}
