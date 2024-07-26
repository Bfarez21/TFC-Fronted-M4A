import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamenComplementario } from '../modelo/examen-complementario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenComplementarioService {

  private urlEndPoint:string="http://localhost:8080/api/atenciones_signos";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  // metodo obtener todos doctor
  getExamenesComplementarios(): Observable<ExamenComplementario[]>{
    return this.http.get<ExamenComplementario[]>(this.urlEndPoint);
  }
// metodo crear doctor
  create(atencionMedica:ExamenComplementario):Observable<ExamenComplementario>{
    return this.http.post<ExamenComplementario>(this.urlEndPoint, atencionMedica,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getAtencionMedica(id=0):Observable<ExamenComplementario>{
    return this.http.get<ExamenComplementario>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

  // metodo buscar por cedula
  buscar(cedula: string): Observable<ExamenComplementario> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<ExamenComplementario>(url);
  }
}
