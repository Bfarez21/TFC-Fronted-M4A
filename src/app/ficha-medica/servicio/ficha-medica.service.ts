import { Injectable, OnInit } from '@angular/core';
import { FichaMedica } from '../modelo/ficha-medica';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService{

  private urlEndPoint:string="http://localhost:8080/api/fichas_medicas";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  getFichasMedicas(): Observable<FichaMedica[]>{
    return this.http.get<FichaMedica[]>(this.urlEndPoint);
  }
  // metodo crear fichas
  create(fichaMedica:FichaMedica):Observable<FichaMedica>{
    return this.http.post<FichaMedica>(this.urlEndPoint, fichaMedica,{headers:this.httpHeaders})
  }
}
