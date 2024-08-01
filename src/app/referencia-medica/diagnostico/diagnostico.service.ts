import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostico } from './diagnostico';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  private urlEndPoint: string = "http://localhost:8080/api/diagnosticos";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getDiagnosticos(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.urlEndPoint).pipe(
      catchError(error => {
        console.error('Error al obtener diagnósticos:', error);
        return throwError(error);
      })
    );
  }

  // create(diagnostico: Diagnostico): Observable<Diagnostico> {
  //   return this.http.post<Diagnostico>(this.urlEndPoint, diagnostico, { headers: this.httpHeaders }).pipe(
  //     catchError(error => {
  //       console.error('Error al crear diagnóstico:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  create(diagnostico: Diagnostico): Observable<Diagnostico> {
    return this.http.post<Diagnostico>(this.urlEndPoint, diagnostico, { headers: this.httpHeaders });
  }

  getDiagnostico(id: number): Observable<Diagnostico> {
    return this.http.get<Diagnostico>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener diagnóstico:', error);
        return throwError(error);
      })
    );
  }

  deleteDiagnostico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(error => {
        console.error('Error al eliminar diagnóstico:', error);
        return throwError(error);
      })
    );
  }
}
