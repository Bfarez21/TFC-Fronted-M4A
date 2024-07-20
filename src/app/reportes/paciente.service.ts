import { Injectable } from '@angular/core';
import { Paciente } from './paciente';
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
// metodo crear pacientes
  create(paciente:Paciente):Observable<Paciente>{
    return this.http.post<Paciente>(this.urlEndPoint, paciente,{headers:this.httpHeaders})
  }
}
