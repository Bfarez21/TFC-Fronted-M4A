import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtencionMedica } from '../modelo/atencion-medica';

@Injectable({
  providedIn: 'root'
})
export class AtencionMedicaService {

  private urlEndPoint:string="http://localhost:8080/api/atenciones_medicas";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

   getAtencionesMedicas(): Observable<AtencionMedica[]>{
    return this.http.get<AtencionMedica[]>(this.urlEndPoint);
  }

  create(atencionMedica:AtencionMedica):Observable<AtencionMedica>{
    return this.http.post<AtencionMedica>(this.urlEndPoint, atencionMedica,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getAtencionMedica(id=0):Observable<AtencionMedica>{
    return this.http.get<AtencionMedica>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  deleteAtencionMedica(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

  // metodo buscar por cedula
  buscarPorCedula(cedula: string): Observable<AtencionMedica> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<AtencionMedica>(url);
  }
}
