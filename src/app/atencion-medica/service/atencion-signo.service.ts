import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtencionSigno } from '../modelo/atencion-signo';
import { environment } from '../../../environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AtencionSignoService {

  private urlEndPoint:string=`${environment.apiBaseUrl}/atenciones_signos`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  // metodo obtener todos doctor
  getAtencionesSignos(): Observable<AtencionSigno[]>{
    return this.http.get<AtencionSigno[]>(this.urlEndPoint);
  }
// metodo crear doctor
  create(atencionMedica:AtencionSigno):Observable<AtencionSigno>{
    return this.http.post<AtencionSigno>(this.urlEndPoint, atencionMedica,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getAtencionMedica(id=0):Observable<AtencionSigno>{
    return this.http.get<AtencionSigno>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  deleteAtencionMedica(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

  // metodo buscar por cedula
  buscarPorCedula(cedula: string): Observable<AtencionSigno> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<AtencionSigno>(url);
  }
}
