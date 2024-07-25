import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AtencMed } from './atenmed';

@Injectable({
  providedIn: 'root'
})
export class AtenMedService {
  private urlEndPoint: string = "http://localhost:8080/api/atencion_medica";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAten(): Observable<AtencMed[]> {
    return this.http.get<AtencMed[]>(this.urlEndPoint);
  }

  getEnfermedadesActuales(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/enfermedades_actuales`);
  }
}
