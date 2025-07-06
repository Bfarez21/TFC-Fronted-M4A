import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AtencMed } from './atenmed';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AtenMedService {
  private urlEndPoint: string =  `${environment.apiBaseUrl}/atenciones_medicas`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAten(): Observable<AtencMed[]> {
    return this.http.get<AtencMed[]>(this.urlEndPoint);
  }

}
