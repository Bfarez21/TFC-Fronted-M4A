import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignoVital } from '../modelo/signo-vital';

@Injectable({
  providedIn: 'root'
})
export class SignoVitalService {

  private urlEndPoint:string="http://localhost:8080/api/signos_vitales";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  // metodo obtener todos doctor
  getSignosVitales(): Observable<SignoVital[]>{
    return this.http.get<SignoVital[]>(this.urlEndPoint);
  }
// metodo crear doctor
  create(atencionMedica:SignoVital):Observable<SignoVital>{
    return this.http.post<SignoVital>(this.urlEndPoint, atencionMedica,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getExamenFisico(id=0):Observable<SignoVital>{
    return this.http.get<SignoVital>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

  // metodo buscar por cedula
  buscar(cedula: string): Observable<SignoVital> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<SignoVital>(url);
  }
}
