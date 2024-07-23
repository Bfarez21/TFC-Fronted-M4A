import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReferenciaMedica } from './referencia-medica';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaMedicaService {

  private urlEndPoint:string= "http://localhost:8080/api/referencias_medicas";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  // Método para obtener una lista de referencias médicas
  getReferencias(): Observable<ReferenciaMedica[]> {
    return this.http.get<ReferenciaMedica[]>(this.urlEndPoint);
  }

  // Método para crear una nueva referencia médica
  create(referencia:ReferenciaMedica):Observable<ReferenciaMedica> {
    return this.http.post<ReferenciaMedica>(this.urlEndPoint, referencia,{headers:this.httpHeaders})
  }
  // metodo para obtener por id
  getReferencia(id=0):Observable<ReferenciaMedica>{
    return this.http.get<ReferenciaMedica>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  deleteReferencia(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}
