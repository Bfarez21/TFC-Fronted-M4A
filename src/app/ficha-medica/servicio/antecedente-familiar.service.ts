import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AntecedenteFamiliar } from '../modelo/antecedente-familiar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteFamiliarService {

  private urlEndPoint:string="http://localhost:8080/api/antecedentes_familiares";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  getDiscapacidad(): Observable<AntecedenteFamiliar[]>{
    return this.http.get<AntecedenteFamiliar[]>(this.urlEndPoint);
  }
  // metodo crear fichas
  create(antecedenteFamiliar:AntecedenteFamiliar):Observable<AntecedenteFamiliar>{
    return this.http.post<AntecedenteFamiliar>(this.urlEndPoint, antecedenteFamiliar,{headers:this.httpHeaders})
  }
}
