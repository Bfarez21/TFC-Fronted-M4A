import { Injectable } from '@angular/core';
import { Instituto } from './Instituto';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private urlEndPoint:string="http://localhost:8080/api/institutos";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  
  createIns(formData: FormData): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, formData);
  }
}