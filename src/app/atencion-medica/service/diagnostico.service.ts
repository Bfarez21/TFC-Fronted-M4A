import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostico } from '../modelo/diagnostico';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  private urlEndPoint:string=`${environment.apiBaseUrl}/diagnosticos`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

   getDiagnosticos(): Observable<Diagnostico[]>{
    return this.http.get<Diagnostico[]>(this.urlEndPoint);
  }

  create(atencionMedica:Diagnostico):Observable<Diagnostico>{
    return this.http.post<Diagnostico>(this.urlEndPoint, atencionMedica,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getDiagnosticosId(id=0):Observable<Diagnostico>{
    return this.http.get<Diagnostico>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  deleteDiagnostico(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

}
