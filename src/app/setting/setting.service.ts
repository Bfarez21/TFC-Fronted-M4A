import { Injectable } from '@angular/core';
import { Instituto } from './Instituto';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Titulo } from './Titulo';

@Injectable({
  providedIn: 'root'
})
export class SettingService {


  private urlEndPoint:string="http://localhost:8080/api/institutos";
  private urlEndPoint2:string="http://localhost:8080/api/titulos";

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  private formData: Instituto | null = null;
  private selectedFile: File | null = null
  private buttonLabel: string = 'Guardar';
  constructor(private http:HttpClient) { }

  createIns(formData: FormData): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, formData);
  }
  getInstitutos(): Observable<Instituto[]>{
    return this.http.get<Instituto[]>(this.urlEndPoint);
  }
  buscarPorCodigo(codigoIns: string): Observable<Instituto> {
    const url = `${this.urlEndPoint}/codigoIns/${codigoIns}`;
    return this.http.get<Instituto>(url);
  }
  deleteInstituto(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
  getInstitutoImage(id: number): Observable<Blob> {
    const url = `${this.urlEndPoint}/${id}/imagen`;
    return this.http.get(url, { responseType: 'blob' });
  }
  

  //metodos crud de titulo
  createTit(formData: FormData): Observable<any> {
    return this.http.post<any>(this.urlEndPoint2, formData);
  }
  getTiitulos(): Observable<Titulo[]>{
    return this.http.get<Titulo[]>(this.urlEndPoint2);
  }
  buscarPorCodigoTit(codigoTit: string): Observable<Titulo> {
    const url = `${this.urlEndPoint}/codigoTit/${codigoTit}`;
    return this.http.get<Titulo>(url);
  }
  deleteTitulo(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

//getters and setters
  setFormData(data: Instituto| null): void {
    this.formData = data;
  }

  getFormData(): Instituto | null {
    return this.formData;
  }
  getSelectedFile(): File | null {
    return this.selectedFile;
  }

  setSelectedFile(file: File | null): void {
    this.selectedFile = file;
  }
  setButtonLabel(label: string): void {
    this.buttonLabel = label;
  }
  getButtonLabel(): string {
    return this.buttonLabel;
  }
}