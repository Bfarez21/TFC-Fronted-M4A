
  
  import { Injectable } from '@angular/core';
  import { Instituto } from './Instituto';
  import { Titulo } from './Titulo';
  import { Observable } from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { environment } from '../../environment/environment.prod';

  @Injectable({
    providedIn: 'root'
  })
  export class SettingService {
  
    private urlEndPoint: string = `${environment.apiBaseUrl}/institutos`;
    private urlEndPoint2: string = `${environment.apiBaseUrl}/titulos`;
  
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    private formDataKey = 'formData';
    private selectedFileKey = 'selectedFile';
    private buttonLabelKey = 'buttonLabel';
  
    constructor(private http: HttpClient) { }
  
    createIns(formData: FormData): Observable<any> {
      return this.http.post<any>(this.urlEndPoint, formData);
    }
    getInstitutos(): Observable<Instituto[]> {
      return this.http.get<Instituto[]>(this.urlEndPoint);
    }
  
  
    buscarPorCodigo(id: number): Observable<Instituto> {
      const url = `${this.urlEndPoint}/${id}`;
      return this.http.get<Instituto>(url);
    }
  
    deleteInstituto(id: number): Observable<void> {
      return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
    }
  
    getInstitutoImage(id: number): Observable<Blob> {
      const url = `${this.urlEndPoint}/${id}/imagen`;
      return this.http.get(url, { responseType: 'blob' });
    }
      // Actualización de instituto
    updateIns(id: number, formData: FormData): Observable<Instituto> {
    return this.http.put<Instituto>(`${this.urlEndPoint}/${id}`, formData);
    }
    updateInstituto(id: number, formData: FormData): Observable<Instituto> {
      return this.http.put<Instituto>(`${this.urlEndPoint}/${id}`, formData, { headers: new HttpHeaders() });
    }
  
    // Métodos CRUD de título (no se incluyen detalles aquí)
  
    // Métodos para manejar el almacenamiento en localStorage
    setFormData(data: Instituto | null): void {
      if (data) {
        localStorage.setItem(this.formDataKey, JSON.stringify(data));
      } else {
        localStorage.removeItem(this.formDataKey);
      }
    }
  
    getFormData(): Instituto | null {
      const data = localStorage.getItem(this.formDataKey);
      return data ? JSON.parse(data) : null;
    }

    setSelectedFile(file: File | null): void {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          localStorage.setItem(this.selectedFileKey, reader.result as string);
        };
      } else {
        localStorage.removeItem(this.selectedFileKey);
      }
    }
    getSelectedFile(): File | null {
      const dataUrl = localStorage.getItem(this.selectedFileKey);
      if (dataUrl) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], 'selectedFile', { type: mime });
      }
      return null;
    }
  
    setButtonLabel(label: string): void {
      localStorage.setItem(this.buttonLabelKey, label);
    }
  
    getButtonLabel(): string {
      return localStorage.getItem(this.buttonLabelKey) || 'Guardar';
    }

    createTit(titulo: Titulo): Observable<Titulo> {
      return this.http.post<Titulo>(this.urlEndPoint2, titulo);
    }
  getTiitulos(): Observable<Titulo[]>{
    return this.http.get<Titulo[]>(this.urlEndPoint2);
  }
  buscarPorCodigoTit(codigoTit: string): Observable<Titulo> {
    const url = `${this.urlEndPoint2}/codigoTit/${codigoTit}`; // Corrección aquí
    return this.http.get<Titulo>(url);
  }
  deleteTitulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint2}/${id}`);
  }
  }
