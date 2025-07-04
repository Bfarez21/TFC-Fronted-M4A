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
  // ✅ NUEVO: Subir PDF a un examen específico
  subirPdfExamen(atencionId: number, examenIndex: number, archivo: File): Observable<string> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    
    return this.http.post(
      `${this.urlEndPoint}/${atencionId}/examenes/${examenIndex}/pdf`, 
      formData,
      { responseType: 'text' }
    );
  }

   // ✅ NUEVO: Eliminar PDF de un examen específico
  eliminarPdfExamen(atencionId: number, examenIndex: number): Observable<string> {
    return this.http.delete(
      `${this.urlEndPoint}/${atencionId}/examenes/${examenIndex}/pdf`,
      { responseType: 'text' }
    );
  }

}
