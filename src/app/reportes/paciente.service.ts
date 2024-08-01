import { Injectable } from '@angular/core';
import { Paciente } from '../ficha-medica/modelo/paciente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlEndPoint:string="http://localhost:8080/api/pacientes";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  // metodo obtener pacientes
  getPacientes(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.urlEndPoint);
  }

    // metodo buscar por cedula
  buscarPorCedula(cedula: string): Observable<Paciente> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<Paciente>(url);
  }

  buscarPorProfesion(profesion: string): Observable<Paciente> {
    const url = `${this.urlEndPoint}/profesion/${profesion}`;
    return this.http.get<Paciente>(url);
  }

}