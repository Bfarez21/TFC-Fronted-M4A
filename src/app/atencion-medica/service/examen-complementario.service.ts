import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamenComplementario } from '../modelo/examen-complementario';

@Injectable({
  providedIn: 'root'
})
export class ExamenComplementarioService {

  private urlEndPoint: string = "http://localhost:8080/api/examenes_complementarios";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  // Método para obtener todos los exámenes complementarios
  getExamenesComplementarios(): Observable<ExamenComplementario[]> {
    return this.http.get<ExamenComplementario[]>(this.urlEndPoint);
  }

  // Método para crear un examen complementario
  create(examenComplementario: ExamenComplementario): Observable<ExamenComplementario> {
    return this.http.post<ExamenComplementario>(this.urlEndPoint, examenComplementario, { headers: this.httpHeaders });
  }

  // Método para obtener un examen complementario por id
  getExamenComplementario(id: number): Observable<ExamenComplementario> {
    return this.http.get<ExamenComplementario>(`${this.urlEndPoint}/${id}`);
  }

  // Método para eliminar un examen complementario
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

  // Método para subir un archivo PDF
  uploadPdf(id: number, file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<void>(`${this.urlEndPoint}/${id}/uploadPdf`, formData);
  }

  // Método para descargar un archivo PDF
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.urlEndPoint}/${id}/downloadPdf`, { responseType: 'blob' as 'json' });
  }
}
