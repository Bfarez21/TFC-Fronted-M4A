import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
  //  create(referencia: ReferenciaMedica): Observable<ReferenciaMedica> {
  //   return this.http.post<ReferenciaMedica>(this.urlEndPoint, referencia, { headers: this.httpHeaders }).pipe(
  //     catchError(error => {
  //       console.error('Error al crear referencia:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  create(referencia: ReferenciaMedica): Observable<ReferenciaMedica> {
    return this.http.post<ReferenciaMedica>(this.urlEndPoint, referencia);
  }

  
  // metodo para obtener por id
  getReferencia(id: number): Observable<ReferenciaMedica> {
    return this.http.get<ReferenciaMedica>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener referencia:', error);
        return throwError(error);
      })
    );
  }
  
 
  // metodo para eliminar doctor
  deleteReferencia(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}
