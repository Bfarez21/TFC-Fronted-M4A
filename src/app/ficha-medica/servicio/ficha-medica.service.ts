import { Injectable } from '@angular/core';
import { FichaMedica } from '../modelo/ficha-medica';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../modelo/paciente';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  private urlEndPoint: string = 'http://localhost:8080/api/fichas_medicas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getFichasMedicas(): Observable<FichaMedica[]> {
    return this.http.get<FichaMedica[]>(this.urlEndPoint);
  }

  create(fichaMedica: FichaMedica): Observable<FichaMedica> {
    return this.http.post<FichaMedica>(this.urlEndPoint, fichaMedica, { headers: this.httpHeaders });
  }

  getFichas(id: number): Observable<FichaMedica> {
    return this.http.get<FichaMedica>(`${this.urlEndPoint}/${id}`);
  }

  getFichaPaciente(paciente: number): Observable<FichaMedica> {
    return this.http.get<FichaMedica>(`${this.urlEndPoint}/paciente/${paciente}`);
  }
 
}
