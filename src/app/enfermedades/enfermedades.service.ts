import { Injectable } from '@angular/core';
import { Enfermedades } from './Enfermedades';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {

  private urlEndPoint:string=`${environment.apiBaseUrl}/enfermedades`;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }
   // metodo obtener todos doctor
   getEnfermedades(): Observable<Enfermedades[]>{
    return this.http.get<Enfermedades[]>(this.urlEndPoint);
  }
  
// metodo crear doctor
  create(enfermedades:Enfermedades):Observable<Enfermedades>{
    return this.http.post<Enfermedades>(this.urlEndPoint, enfermedades,{headers:this.httpHeaders})
  }
  // metodo para obtener por id
  getEnfermedad(id=0):Observable<Enfermedades>{
    return this.http.get<Enfermedades>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  deleteEnfermedad(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
  // metodo buscar por cedula
  buscarPorCodigo(codigoEnf: string): Observable<Enfermedades> {
    const url = `${this.urlEndPoint}/codigoEnf/${codigoEnf}`;
    return this.http.get<Enfermedades>(url);
  }
}