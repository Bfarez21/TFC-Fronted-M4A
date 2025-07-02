import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlEndPoint:string="http://localhost:8080/api/doctores"; // uso localmente
  //private urlEndPoint:string="http://192.168.18.158:8381/api/doctores";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

   // metodo obtener todos doctor
   getDoctores(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.urlEndPoint);
  }
// metodo crear doctor
  create(doctor:Doctor):Observable<Doctor>{
    return this.http.post<Doctor>(this.urlEndPoint, doctor,{headers:this.httpHeaders})
  }

  // metodo para obtener por id
  getDoctor(id=0):Observable<Doctor>{
    return this.http.get<Doctor>(`${this.urlEndPoint}/${id}`);
  }
  // metodo para eliminar doctor
  deleteDoctor(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

  // metodo buscar por cedula
  buscarPorCedula(cedula: string): Observable<Doctor> {
    const url = `${this.urlEndPoint}/cedula/${cedula}`;
    return this.http.get<Doctor>(url);
  }
}
