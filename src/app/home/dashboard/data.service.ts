import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getEnfermedadesActuales(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/enfermedades_actuales`);
  }

  getAtencionesPorAno(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.apiUrl}/atenciones_por_ano`);
  }
  getPacientesPorCarrera(): Observable<Map<string, number>> {
  return this.http.get<Map<string, number>>(`${this.apiUrl}/pacientes/carreras`);
}

}
