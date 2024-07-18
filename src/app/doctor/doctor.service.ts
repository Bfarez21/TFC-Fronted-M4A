import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlEndPoint:string="http://localhost:8080/api/doctores";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

   // metodo obtener doctor
   getDoctores(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.urlEndPoint);
  }
// metodo crear doctor
  create(doctor:Doctor):Observable<Doctor>{
    return this.http.post<Doctor>(this.urlEndPoint, doctor,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getDoctor(id_doctor=0):Observable<Doctor>{
    return this.http.get<Doctor>(`${this.urlEndPoint}/${id_doctor}`);
  }
}
