import { Injectable } from '@angular/core';
import { Paciente } from '../modelo/paciente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlEndPoint:string=`${environment.apiBaseUrl}/pacientes`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }
  // metodo obtener pacientes
  getPacientes(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.urlEndPoint);
  }
// metodo crear pacientes
  create(paciente:Paciente):Observable<Paciente>{
    return this.http.post<Paciente>(this.urlEndPoint, paciente,{headers:this.httpHeaders})
  }
   // metodo buscar por cedula de paciente
   buscarPorCedula(cedula: string): Observable<Paciente> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<Paciente>(url);
  }
  // metodo buscar por apellido de paciente
  buscarPorApellido(apellido: string): Observable<Paciente> {
    const url = `${this.urlEndPoint}/apellido/${apellido}`;
    return this.http.get<Paciente>(url);
  }
  // metodo buscar por profesion de paciente
  buscarPorProfesion(profesion: string): Observable<Paciente> {
    const url = `${this.urlEndPoint}/profesion/${profesion}`;
    return this.http.get<Paciente>(url);
  }
}
