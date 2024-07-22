import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discapacidad } from '../modelo/discapacidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscapacidadService {

  private urlEndPoint:string="http://localhost:8080/api/discapacidades";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  getDiscapacidad(): Observable<Discapacidad[]>{
    return this.http.get<Discapacidad[]>(this.urlEndPoint);
  }
  // metodo crear fichas
  create(antecedenteFamiliar:Discapacidad):Observable<Discapacidad>{
    return this.http.post<Discapacidad>(this.urlEndPoint, antecedenteFamiliar,{headers:this.httpHeaders})
  }
}
