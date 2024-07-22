import { Injectable } from '@angular/core';
import { AtencMed } from './atenmed';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AtenMedService {

  private urlEndPoint:string="http://localhost:8080/api/atencion_medica";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }
  // metodo obtener atenciones
  getAten(): Observable<AtencMed[]>{
    return this.http.get<AtencMed[]>(this.urlEndPoint);
  }
}
