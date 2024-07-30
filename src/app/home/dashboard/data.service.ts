import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getEnfermedadesActuales(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/enfermedades_actuales`);
  }

  getAtencionesPorAno(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.apiUrl}/atenciones_por_ano`);
  }
}
