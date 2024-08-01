import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ReferenciaMedica } from './referencia-medica';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaMedicaService {

  private urlEndPoint: string = "http://localhost:8080/api/referencias_medicas";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  // Método para obtener una lista de referencias médicas
  getReferencias(): Observable<ReferenciaMedica[]> {
    return this.http.get<ReferenciaMedica[]>(this.urlEndPoint);
  }
  // getReferencias(): Observable<ReferenciaMedica[]> {
  //   return this.http.get<ReferenciaMedica[]>(this.urlEndPoint)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
  //   return throwError('Something bad happened; please try again later.');
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


  // metodo para eliminar referencai
  deleteReferencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}
