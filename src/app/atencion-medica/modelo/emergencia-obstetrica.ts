import { FichaMedica } from "../../ficha-medica/modelo/ficha-medica";

export class EmergenciaObstetrica {
    id_eme: number = 0;
    menarca_eme: number = 0;
    ritmo_menstrual_eme: string = '';
    ciclos_eme: string = '';
    fum_eme: Date | null = null;
    ivsa_eme: boolean = false;
    numero_parejas_sexuales_eme: number = 0;
    g_eme: number = 0;
    a_eme: number = 0;
    p_eme: number = 0;
    c_eme: number = 0;
    dismenorrea_eme: boolean = false;
    mastodinia_eme: boolean = false;
    fpp_eme: Date | null = null;
    controles_eme: string = '';
    inmunizaciones_eme: string = '';
    descripcion_eme: string = '';
    isEmbarazada: boolean = false;
    fichaMedica: FichaMedica= new FichaMedica();  // Assuming FichaMedica is another class
}
