import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamenFisico } from '../modelo/examen-fisico';

@Injectable({
  providedIn: 'root'
})
export class ExamenFisicoService {

  private urlEndPoint:string="http://localhost:8080/api/atenciones_signos";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  // metodo obtener todos doctor
  getExamenesComplementarios(): Observable<ExamenFisico[]>{
    return this.http.get<ExamenFisico[]>(this.urlEndPoint);
  }
// metodo crear doctor
  create(atencionMedica:ExamenFisico):Observable<ExamenFisico>{
    return this.http.post<ExamenFisico>(this.urlEndPoint, atencionMedica,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getExamenFisico(id=0):Observable<ExamenFisico>{
    return this.http.get<ExamenFisico>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

  // metodo buscar por cedula
  buscar(cedula: string): Observable<ExamenFisico> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<ExamenFisico>(url);
  }
}

